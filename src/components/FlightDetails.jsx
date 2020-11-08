import React, { useState, useEffect } from 'react'

export default function FlightDetails(props) {
    const [date, setDate] = useState(undefined)
    const [departure, setDeparture] = useState(undefined)
    const [arrival, setArrival] = useState(undefined)

    useEffect(() => {
        const FLightDetailsInit = async () => {
            try {
                if (props.web3 === undefined) return
                const flightContract = new props.web3.eth.Contract(JSON.parse(process.env.REACT_APP_FLIGHT_ABI), props.flight)
                const timestamp = parseInt(await flightContract.methods.timestamp().call()) * 1000;
                const departure = await flightContract.methods.departure().call();
                const arrival = await flightContract.methods.arrival().call();
                const date = new Date(timestamp).toLocaleString();
                setDate(date)
                setDeparture(departure)
                setArrival(arrival)

            } catch (e) {
                console.log(`Error at FlightDetails`, e.message);
            }
        }
        FLightDetailsInit();
    }, [props.web3])

    return (
        <div className="d-inline">
            <span>Date: {date}</span>
            <span>Departure: {departure}</span>
            <span>Arrival: {arrival}</span>
        </div>
    )
}
