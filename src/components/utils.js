const indianAirport = require("../public/indianAirport.json");

const getPastFlightAddedEvent = async (web3) => {
  try {
    const allFlightAddresses = [];
    const factoryContract = new web3.eth.Contract(
      JSON.parse(process.env.REACT_APP_FLIGHT_FACTORY_ABI),
      process.env.REACT_APP_FLIGHT_FACTORY_ADDRESS
    );
    const flightAddedEvents = await factoryContract.getPastEvents("FlightAdded", { fromBlock: 0, toBlock: "latest" });
    flightAddedEvents.forEach((flight) => {
      allFlightAddresses.push(flight.returnValues.flightAddress);
    });
    return allFlightAddresses;
  } catch (e) {
    console.error(`Error at getPastFlightAddedEvent ${e.message}`);
    throw e;
  }
};

const findCity = (bytes32) => {
  const cityFound = indianAirport
    .filter((airport) => {
      return airport.bytes32 === bytes32;
    })
    .map((obj) => obj.city_name);
  if (cityFound.length === 0) return "Unknown";
  return cityFound[0];
};
const getPastFlightsDetails = async (web3, allFlights) => {
  try {
    let pastFlightsDetails = [];
    for (let i = 0; i < allFlights.length; i++) {
      const flight = allFlights[i];
      const index = i;
      const flightObject = await getPastFlightDetails(web3, flight);
      flightObject["id"] = String(index);
      pastFlightsDetails.push(flightObject);
    }
    return pastFlightsDetails;
  } catch (e) {
    console.error(`Error at FlightDetails:`, e.message);
    throw e;
  }
};

const flightOwnerDetails = async (web3, ownerAddress) => {
  try {
    const ownerFlightsDetails = [];
    const ffContract = new web3.eth.Contract(
      JSON.parse(process.env.REACT_APP_FLIGHT_FACTORY_ABI),
      process.env.REACT_APP_FLIGHT_FACTORY_ADDRESS
    );
    const events = await ffContract.getPastEvents("FlightAdded", {
      fromBlock: 0,
      toBlock: "latest",
      filter: { owner: ownerAddress },
    });
    for (let i = 0; i < events.length; i++) {
      const { flight, baseFare, date, status } = await getPastFlightDetails(web3, events[i].returnValues.flightAddress);
      const ownerFlightObject = {
        id: i + 1,
        flight,
        baseFare,
        status,
        claimTime: new Date(new Date(date).getTime() + 172800 * 1e3).toISOString(),
      };
      ownerFlightsDetails.push(ownerFlightObject);
    }
    return ownerFlightsDetails;
  } catch (e) {
    console.error(`Error at flightOwnerDetails:`, e.message);
    throw e;
  }
};

const flightPassengerDetails = async (web3, passengerAddress) => {
  try {
    const passengerFutureFlights = [];
    const passengerPastFlights = [];
    const pastFlightAddress = await getPastFlightAddedEvent(web3);
    let futureFlightNo = 0
    let pastFlightNo = 0;
    for (let i = 0; i < pastFlightAddress.length; i++) {
      const { flight, departure, arrival, date, baseFare, status } = await getPassengerFlightDetails(
        web3,
        pastFlightAddress[i],
        passengerAddress
      );
      if (flight === undefined) continue
      if (new Date().getTime() >= new Date(date).getTime()){
        let statusString;
        let delayWithdraw;
        console.log(status)
        if(status === "No Dispute"){
          statusString = "No Dispute"
          delayWithdraw = "No"
        } else if(status === "inDispute"){
          statusString = "In Dispute"
          delayWithdraw = "No"
        } else{
          const ffInstance = new web3.eth.Contract(JSON.parse(process.env.REACT_APP_FLIGHT_ABI), flight);
          const shouldRefund = await ffInstance.methods.shouldRefund().call();
          shouldRefund === true || shouldRefund === 1 ? statusString = "Dispute accepted" : statusString = "Dispute rejected"
          const withdrawalEvents = await ffInstance.getPastEvents("Withdrawal",{ fromBlock: 0, toBlock: "latest" })
          const passengerWithdrawalFilter = withdrawalEvents.filter(event => event.returnValues.withdrawer === passengerAddress)
          passengerWithdrawalFilter.length === 0 ? delayWithdraw = "Yes" : delayWithdraw="No"
        }
        futureFlightNo++
        passengerPastFlights.push({id: futureFlightNo,flight, baseFare, statusString,delayWithdraw})
      } else{
        pastFlightNo++
        passengerFutureFlights.push({id: pastFlightNo,flight, departure, arrival, date, baseFare});
      }
    }
    return {passengerPastFlights, passengerFutureFlights};
  } catch (e) {
    console.error(`Error at flightPassengerDetails:`, e.message);
    throw e;
  }
}

const getPastFlightDetails = async (web3, flightAddress) => {
  try {
    const flightContract = await getFlightContract(web3, flightAddress);
    let date = parseInt(await flightContract.methods.timestamp().call()) * 1000;
    date = new Date(date).toISOString();
    let departure = await flightContract.methods.departure().call();
    departure = findCity(departure);
    let arrival = await flightContract.methods.arrival().call();
    arrival = findCity(arrival);
    const baseFare = String(await flightContract.methods.baseFare().call());
    const passengerLimit = String(await flightContract.methods.passengerLimit().call());
    const passengerCount = String(await flightContract.methods.passengerCount().call());
    const flightOwner = await flightContract.methods.flightOwner().call();
    let status = (await flightContract.methods.status().call()) / 1;
    status = status === 0 ? "No Dispute" : status === 1 ? "In Dispute" : "Settled";
    return {
      flight: flightAddress,
      departure,
      arrival,
      date,
      baseFare,
      passengerLimit,
      passengerCount,
      flightOwner,
      status,
    };
  } catch (e) {
    console.error(`Error at FlightDetails:`, e.message);
    throw e;
  }
};
const getPassengerFlightDetails = async (web3, flightAddress, passengerAddress) => {
  try {
    const flightContract = await getFlightContract(web3, flightAddress);
    if ((await flightContract.methods.buyerDetails(passengerAddress).call())[1] === "" ){
      return {}
    }
    let date = parseInt(await flightContract.methods.timestamp().call()) * 1000;
    date = new Date(date).toISOString();
    let departure = await flightContract.methods.departure().call();
    departure = findCity(departure);
    let arrival = await flightContract.methods.arrival().call();
    arrival = findCity(arrival);
    const baseFare = String(await flightContract.methods.baseFare().call());
    const passengerLimit = String(await flightContract.methods.passengerLimit().call());
    const passengerCount = String(await flightContract.methods.passengerCount().call());
    const flightOwner = await flightContract.methods.flightOwner().call();
    let status = (await flightContract.methods.status().call()) / 1;
    status = status === 0 ? "No Dispute" : status === 1 ? "In Dispute" : "Settled";
    return {
      flight: flightAddress,
      departure,
      arrival,
      date,
      baseFare,
      passengerLimit,
      passengerCount,
      flightOwner,
      status,
    };
  } catch (e) {
    console.error(`Error at FlightDetails:`, e.message);
    throw e;
  }
};

const bookTicket = async (web3, flightAddress, passengerName, baseFare) => {
  try {
    const flightContract = await getFlightContract(web3, flightAddress);
    const account = (await web3.eth.getAccounts())[0];
    await flightContract.methods
      .buyTicket(passengerName)
      .send({ from: account, value: baseFare })
      .on("transactionHash", (transactionHash) => transactionHash)
      .on("error", (error) => error);
  } catch (e) {
    console.error(`Error at bookTicket:`, e.message);
    throw e;
  }
};

const withdrawMoney = async (web3, flightAddress) => {
  try {
    const flightContract = await getFlightContract(web3, flightAddress);
    const account = (await web3.eth.getAccounts())[0];
    await flightContract.methods
      .withdrawMoney()
      .send({ from: account })
      .on("transactionHash", (transactionHash) => transactionHash)
      .on("error", (error) => error);
  } catch (e) {
    console.error(`Error at claimFunds:`, e.message);
    throw e;
  }
};

const raiseDispute = async(web3, flightAddress) => {
  try {
    const flightContract = new web3.eth.Contract(JSON.parse(process.env.REACT_APP_FLIGHT_ABI), flightAddress);
    const account = (await web3.eth.getAccounts())[0];
    await flightContract.methods
      .flightDelayRaise()
      .send({ from: account })
      .on("transactionHash", (transactionHash) => transactionHash)
      .on("error", (error) => error);
  } catch (e) {
    console.error(`Error at raiseDispute:`, e.message);
    throw e;
  }
}

const getFlightContract = async(web3, flightAddress) => {
  try{
    const flightContract = new web3.eth.Contract(JSON.parse(process.env.REACT_APP_FLIGHT_ABI), flightAddress);
    return flightContract;
  }
  catch(e){
    console.error(`Error at getFlightContract:`, e.message);
    throw e;
  }
}

export {
  getPastFlightsDetails,
  getPastFlightAddedEvent,
  getPastFlightDetails,
  bookTicket,
  flightOwnerDetails,
  withdrawMoney,
  flightPassengerDetails,
  raiseDispute
};
