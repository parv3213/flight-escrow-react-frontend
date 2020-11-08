import React, {useEffect, useState} from 'react';
import FlightDetails from "./FlightDetails.jsx"

export default function AvailableFlight(props) {
    const [allFlights, setAllFlights] = useState([])
    
    useEffect(() => {
        const getPastFlightAddedEvent = async () => {
            try{
                if(props.web3 === undefined) return 
                const factoryContract = new props.web3.eth.Contract(JSON.parse(process.env.REACT_APP_FLIGHT_FACTORY_ABI), process.env.REACT_APP_FLIGHT_FACTORY_ADDRESS);
                const flightAddedEvents = await factoryContract.getPastEvents("FlightAdded",{fromBlock: 0, toBlock: 'latest'});
                flightAddedEvents.forEach((flight) => {
                    setAllFlights(oldArray => {
                        if (oldArray.includes(flight.returnValues.flightAddress)) return [...oldArray]
                        return [...oldArray, flight.returnValues.flightAddress]
                    });
                })
            }catch(e){
                console.error(`Error at AvailableFlight ${e.message}`)
            }
        }
        getPastFlightAddedEvent()
    }, [props.web3])
    
    return(
        <div className="jumbotron py-3 pb-0">
        <h3>Available Flight</h3>
        <ul>
        {allFlights.map((flight, index) => {
            return (<li key={index}>{flight} <FlightDetails web3={props.web3} flight={flight} /></li>)
        })}
        </ul>
        </div>
        )
    }
    