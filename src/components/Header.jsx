import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import logo from "../public/plane.png";

export default function Header(props) {
    const [networkName, setNetworkName] = useState("Undefined Network")
    const [showAddress, setShowAddress] = useState(false)
    const handleClose = () => setShowAddress(false);
    const handleShow = () => setShowAddress(true);

    useEffect(() => {
        const findNetworkName = () => {
            if (props.networkId === 42){
                setNetworkName("Kovan")
            } else if (props.networkId === 1){
                setNetworkName("Mainnet")
            } else if (props.networkId === 5777){
                setNetworkName("Local Test")
            }
        }
        findNetworkName();
    }, [props.networkId, props.accountBalance])
    return (
        <div id="header">
            <nav className="navbar navbar-expand-lg my-3">
                <img src={logo} alt="Airplane" style={{ width: "25px", heigh: "25px" }} />
                <a href="/" className="heading-font navbar-brand mr-auto ml-2">
                    Flight Escrow
                </a>
                <div className="ml-auto">
                    <span className="mx-1" className="network-name">
                        {networkName}
                    </span>
                    <div className="user-account-details d-inline ml-1">
                        <span className="mx-1">{props.accountBalance} ETH</span>
                        <span onClick = {handleShow} className="ml-1" className="user-account-address">
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
