import React, { useEffect, useState } from "react";
import { getPastFlightDetails } from "./utils";

export default function ConfirmFlightDetails(props) {
    const [departure, setDeparture] = useState("");
    const [arrival, setArrival] = useState("");
    const [date, setDate] = useState("");
    const [baseFare, setBaseFare] = useState("");
    const [seatLeft, setSeatLeft] = useState(0);
    const [flightAddress, setFlightAddress] = useState("");

    useEffect(() => {
        const init = async () => {
            if (props.web3 === undefined) return;
            const path = window.location.href;
            const flightAddress = path.split("/")[path.split("/").length - 1];
            const { departure, arrival, date, baseFare, passengerLimit, passengerCount } = await getPastFlightDetails(props.web3, flightAddress);
            setDeparture(departure);
            setArrival(arrival);
            setDate(date);
            setBaseFare(baseFare);
            setSeatLeft(parseInt(passengerLimit) - parseInt(passengerCount));
            setFlightAddress(flightAddress);
        };
        init();
    }, [props.web3]);

    return (
        <div className="jumbotron py-3 pb-0">
            <h3 className="mb-3">Book Tickets</h3>
            <div className="form-inline">
                <div className="d-block w-100">
                    <div className="input-group mb-3 mr-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">FLight Contract Address</span>
                        </div>
                        <input className="w-50" type="text" value={flightAddress} readOnly />
                    </div>
                </div>

                <div className="input-group mb-3 mr-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Departure</span>
                    </div>
                    <input type="text" value={departure} readOnly />
                </div>
                <div className="input-group mb-3 mr-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Arrival</span>
                    </div>
                    <input type="text" readOnly value={arrival} />
                </div>
                <div className="input-group mb-3 mr-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Date</span>
                    </div>
                    <input type="text" value={new Date(date).toLocaleString()} readOnly />
                </div>
                <div className="input-group mb-3 mr-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">BaseFare</span>
                    </div>
                    <input type="text" value={baseFare / 1e18} readOnly />
                    <div className="input-group-append">
                        <span className="input-group-text">ETH</span>
                    </div>
                </div>
                <div className="input-group mb-3 mr-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Seats Left</span>
                    </div>
                    <input type="number" value={seatLeft} readOnly />
                </div>
            </div>
            <button className="btn btn-warning w-100 mt-5">Confirm Flight Details</button>
        </div>
    );
}
