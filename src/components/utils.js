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
            const { departure, arrival, date, baseFare, passengerLimit, passengerCount, flightOwner } = await getPastFlightDetails(web3, flight);
            await pastFlightsDetails.push({
                id: String(index),
                flight,
                departure,
                arrival,
                date,
                baseFare,
                passengerLimit,
                passengerCount,
                flightOwner,
            });
        }
        return pastFlightsDetails;
    } catch (e) {
        console.error(`Error at FlightDetails:`, e.message);
        throw e;
    }
};

const getPastFlightDetails = async (web3, flightAddress) => {
    try {
        const flightContract = new web3.eth.Contract(JSON.parse(process.env.REACT_APP_FLIGHT_ABI), flightAddress);
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
        return { departure, arrival, date, baseFare, passengerLimit, passengerCount, flightOwner };
    } catch (e) {
        console.error(`Error at FlightDetails:`, e.message);
        throw e;

    }
};

const bookTicket = async (web3, flightAddress, passengerName, baseFare) => {
    try {
        const flightContract = new web3.eth.Contract(JSON.parse(process.env.REACT_APP_FLIGHT_ABI), flightAddress);
        const account = (await web3.eth.getAccounts())[0];
        await flightContract.methods
            .buyTicket(passengerName)
            .send({from: account, value: baseFare})
            .on("transactionHash", (transactionHash) => transactionHash)
            .on("error", (error) => error);
    } catch (e) {
        console.error(`Error at bookTicket:`, e.message);
        throw e;
    }
};

export { getPastFlightsDetails, getPastFlightAddedEvent, getPastFlightDetails, bookTicket };
