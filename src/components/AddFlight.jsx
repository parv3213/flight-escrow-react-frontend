import React, { useEffect, useState } from 'react'
import indianAirport from "../public/indianAirport.json"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({ container: { display: 'flex', flexWrap: 'wrap', width: "100"}, textField: { marginLeft: theme.spacing(1), marginRight: theme.spacing(1), width: 200, }, }));

export default function AddFlight(props) {
    const classes = useStyles();
    const [factoryContract, setFactoryContract] = useState(undefined);
    const [escrowAddress, setEscrowAddress] = useState("");
    const [departure, setDeparture] = useState("");
    const [arrival, setArrival] = useState("");
    const [baseFare, setBaseFare] = useState(Number);
    const [passengerLimit, setPassengerLimit] = useState(Number);
    const [departureTime, setDepartureTime] = useState("");
    const [searchCity, setSearchCity] = useState("");
    const [searchResults, setSearchResult] = useState(new Array(0));

    const searchAirport = async() => {
        const searchResults = indianAirport
        .filter(city => city.city_name.slice(0,searchCity.length).toLowerCase() === searchCity.toLowerCase())
        .map((city) => city.city_name);
        setSearchResult(searchResults)
    }

    const addNewFlight = async (e) => {
        try{
            e.preventDefault();
            const departureTimestamp = parseInt(new Date(departureTime).getTime()/1000)
            const departureKeccak = props.web3.utils.keccak256(departure);
            const arrivalKeccak = props.web3.utils.keccak256(arrival);
            const weiBaseFare = props.web3.utils.toWei(baseFare, "ether")
            await factoryContract.methods
            .addFlight(departureTimestamp,departureKeccak,arrivalKeccak, weiBaseFare, passengerLimit)
            .send({from: props.account, value: weiBaseFare/2})
            .on("transactionHash", (hash) => {
                console.log(`Transaction Hash: ${hash}`);
                props.setRefresh(m => !props.refresh)
            }).on("error", console.error)
        }catch(e){
            alert(`Some error!\n${e.message}`)
        }
        
    }

    useEffect(() => {
        const contractInit = async () => {
            try {
                if (props.web3 === undefined) return
                const factoryContract = new props.web3.eth.Contract(JSON.parse(process.env.REACT_APP_FLIGHT_FACTORY_ABI), process.env.REACT_APP_FLIGHT_FACTORY_ADDRESS);
                const escrowAddress = await factoryContract.methods.escrow().call();
                setFactoryContract(factoryContract)
                setEscrowAddress(escrowAddress)
            }
            catch (e) { console.error(`Error at AddFlight ${e.message}`) }
        }
        contractInit();
    }, [props.web3])
    return (
        <div className="jumbotron py-3 pb-0">
            <h3 className="mb-3">Add a Flight</h3>
            <form onSubmit={addNewFlight}>
                <div className="form-inline">
                    <div className="input-group mb-3 mr-3">
                        <div className="input-group-prepend"> <span className="input-group-text">Departure</span> </div>
                        <input type="text" list="destination" value={departure} onChange={(e) => {setDeparture(e.target.value); setSearchCity(e.target.value); searchAirport()}} required />
                        <datalist id="destination">
                            {searchResults.map((searchResult, index) => {
                                return (<option key={index} value={searchResult}/>)
                            })}
                        </datalist>
                    </div>
                    <div className="input-group mb-3 mr-3">
                        <div className="input-group-prepend"> <span className="input-group-text">Arrival</span> </div>
                        <input type="text" list="arrival" value={arrival} onChange={(e) => {setArrival(e.target.value); setSearchCity(e.target.value); searchAirport()}} required />
                        <datalist id="arrival">
                            {searchResults.map((searchResult, index) => {
                                return (<option key={index} value={searchResult}/>)
                            })}
                        </datalist>
                    </div>
                    <div className="input-group mb-3 mr-3">
                        <div className="input-group-prepend"> <span className="input-group-text">Base Fare</span> </div>
                        <input type="number" value={baseFare} onChange={(e) => setBaseFare(e.target.value)} placeholder="ETH" required />
                        <div className="input-group-append"> <span className="input-group-text">ETH</span> </div>
                    </div>
                    <div className="input-group mb-3 mr-3">
                        <div className="input-group-prepend"> <span className="input-group-text">Passenger Limit</span> </div>
                        <input type="number" value={passengerLimit} onChange={(e) => setPassengerLimit(e.target.value)} required />
                    </div>
                    <div className="input-group mb-3 mr-3 w-100">
                        <div className="input-group-prepend"> <span className="input-group-text">Departure Time</span> </div>
                        <TextField type="datetime-local" defaultValue="2017-05-24T10:30" onChange={(e) => setDepartureTime(e.target.value)} className={classes.textField} InputLabelProps={{ shrink: true, }} />
                    </div>
                </div>
                <div className="input-group mb-3 mr-3">
                    <div className="input-group-prepend"> <span className="input-group-text">Flight Owner</span> </div>
                    <input type="text" className="w-50" value={props.account} readOnly />
                </div>
                <button type="submit" className="btn btn-warning">Add new flight</button>
            </form>
            <p className="text-center mt-5">Escrow address: {escrowAddress}</p>
        </div>
    )
}
