import React from "react";

export default function ConfirmDetails({flightAddress, departure, arrival, baseFare, date, seatLeft, setFlightConfirmed}) {
    return (
        <div>
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
            <button className="btn btn-warning w-100 mt-5" onClick={e => setFlightConfirmed(true)}>
                Confirm Flight Details
            </button>
        </div>
    );
}
