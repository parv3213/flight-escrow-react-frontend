import React, { useState, useEffect } from 'react'
import indianAirport from "../public/indianAirport.json"

export default function FlightDetails(props) {
    const [date, setDate] = useState(undefined)
    const [departure, setDeparture] = useState(undefined)
    const [arrival, setArrival] = useState(undefined)

    const findCity = (bytes32) => {
        const cityFound = indianAirport.filter((airport) => {
            return airport.bytes32 === bytes32
        }).map((obj) => obj.city_name)
        if (cityFound.length === 0) return "Unknown"
        return cityFound[0]
    }

    useEffect(() => {
        const FLightDetailsInit = async () => {
            try {
                if (props.web3 === undefined) return
                const flightContract = new props.web3.eth.Contract(JSON.parse(process.env.REACT_APP_FLIGHT_ABI), props.flight)
                const timestamp = parseInt(await flightContract.methods.timestamp().call()) * 1000;
                let departure = await flightContract.methods.departure().call();
                let arrival = await flightContract.methods.arrival().call();
                const date = new Date(timestamp).toLocaleString();
                departure = findCity(departure);
                arrival = findCity(arrival);
                setDate(date)
                setDeparture(departure)
                setArrival(arrival)
            } catch (e) {
                console.log(`Error at FlightDetails`, e.message);
            }
        }
        FLightDetailsInit();
    }, [props.web3,props.flight])

    return (
        <div className="d-inline">
            <span className = "ml-3">Date: {date}</span>
            <span className = "ml-3">Departure: {departure}</span>
            <span className = "ml-3">Arrival: {arrival}</span>
        </div>
    )
}
