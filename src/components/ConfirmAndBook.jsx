import React, { useEffect, useState } from "react";
import BookTicket from "./BookTicket";
import ConfirmDetails from "./ConfirmDetails";
import { getPastFlightDetails } from "./utils";

export default function ConfirmAndBook(props) {
    const [departure, setDeparture] = useState("");
    const [arrival, setArrival] = useState("");
    const [date, setDate] = useState("");
    const [baseFare, setBaseFare] = useState("");
    const [seatLeft, setSeatLeft] = useState(0);
    const [flightAddress, setFlightAddress] = useState("");
    const [flightConfirmed, setFlightConfirmed] = useState(false);

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
            {flightConfirmed ? (
                <BookTicket baseFare={baseFare} flightAddress={flightAddress} web3= {props.web3}/>
            ) : (
                <ConfirmDetails
                    flightAddress={flightAddress}
                    departure={departure}
                    arrival={arrival}
                    baseFare={baseFare}
                    date={date}
                    seatLeft={seatLeft}
                    setFlightConfirmed={setFlightConfirmed}
                />
            )}
        </div>
    );
}
