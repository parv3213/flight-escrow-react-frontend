import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

export default function Header(props) {
    const [networkName, setNetworkName] = useState("Undefined Network");
    const [showAddress, setShowAddress] = useState(false);
    const handleClose = () => setShowAddress(false);
    const handleShow = () => setShowAddress(true);

    useEffect(() => {
        const findNetworkName = () => {
            if (props.networkId === 42) {
                setNetworkName("Kovan");
            } else if (props.networkId === 1) {
                setNetworkName("Mainnet");
            } else if (props.networkId === 3) {
                setNetworkName("Ropsten");
            } else if (props.networkId === 4) {
                setNetworkName("Rinkeby");
            } else if (props.networkId === 5) {
                setNetworkName("Goerli");
            } else if (props.networkId === 5777) {
                setNetworkName("Local Test");
            } else {
                setNetworkName("Unknown");
            }
        };
        findNetworkName();
    }, [props.networkId, props.accountBalance]);
    return (
        <div id="header">
            <nav className="navbar navbar-expand-lg my-3">
                <div className="mr-auto">
                    <img src="./plane.png" alt="Airplane" style={{ width: "25px", heigh: "25px" }} />
                    <Link to="/" className="heading-font navbar-brand ml-2">
                        Flight Escrow
                    </Link>
                    <Link to="/flights" className="mx-4 navbar-links no-decoration">
                        Flights
                    </Link>
                    <Link to="/add" className="mx-4 navbar-links no-decoration">
                        Add
                    </Link>
                    <Link to="/flightOwner" className="mx-4 navbar-links no-decoration">
                        Flight Owner
                    </Link>
                    <Link to="/flightPassenger" className="mx-4 navbar-links no-decoration">
                        Flight Passenger
                    </Link>
                </div>

                <div className="ml-auto">
                    <span className="mx-1 network-name">{networkName}</span>
                    <div className="user-account-details d-inline ml-1">
                        <span className="mx-1">{props.accountBalance} ETH</span>
                        <span onClick={handleShow} className="ml-1 user-account-address">
                            {props.account.slice(0, 6) + "..." + props.account.slice(-4)}
                        </span>
                    </div>
                </div>
            </nav>
            <hr className="mt-0 mb-5" />
            <Modal show={showAddress} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Account Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.account}</Modal.Body>
            </Modal>
        </div>
    );
}
