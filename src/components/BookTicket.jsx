import React, { useState } from "react";
import {bookTicket} from "./utils"
import Spinner from "react-bootstrap/Spinner";


export default function BookTicket(props) {
    const [passengerName, setPassengerName] = useState("");
    const [loading, setLoading] = useState(false);

    const bookTicketClick = async () => {
        try{
            setLoading(true);
            if(props.web3 === undefined) throw new Error("Web3 not defined")
            if (passengerName.length === 0) throw new Error("Invalid passenger name")
            await bookTicket(props.web3, props.flightAddress, passengerName, props.baseFare)
            setLoading(false);
        }catch(e){
            console.error(e);
            alert(`Some error\n${e.message}`)
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="input-group mb-3 mr-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Passenger Name</span>
                </div>
                <input type="text" value={passengerName} onChange={(e) => setPassengerName(e.target.value)} />
            </div>
            <div>
                <button className="btn btn-dark" onClick={bookTicketClick}>Book Ticket</button>
                {loading && <Spinner className="ml-3 text-align-center" animation="border" role="status" />}
                <span className="ml-3 text-muted h6"> ℹThis will cost ${props.baseFare / 1e18} ETH</span>
            </div>
        </div>
    );
}
