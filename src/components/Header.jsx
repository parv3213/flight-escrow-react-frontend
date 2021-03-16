import React, { useState, useEffect } from "react";
import planeLogo from "../public/plane.png";
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
			<nav className="navbar navbar-expand-xl mb-3">
				<span className="navbar-brand">
					<img src={planeLogo} alt="Airplane" style={{ width: "25px", heigh: "25px" }} />
					<Link to="/" className="heading-font ml-2 no-decoration">
						Flight Escrow
					</Link>
				</span>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon">A</span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item active">
							<Link to="/flights" className="mx-4 nav-link no-decoration">
								Flights
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/add" className="mx-4 nav-link no-decoration">
								Add
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/flightOwner" className="mx-4 nav-link no-decoration">
								Flight Owner
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/flightPassenger" className="mx-4 nav-link no-decoration">
								Flight Passenger
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/FlightDispute" className="mx-4 nav-link no-decoration">
								Dispute
							</Link>
						</li>
					</ul>
					<div className="dropdown-menu" aria-labelledby="navbarDropdown"></div>
					<div className="ml-auto">
						<span className="mx-1 network-name">{networkName}</span>
						<div className="user-account-details d-inline ml-1">
							<span className="mx-1">{props.accountBalance} ETH</span>
							<span onClick={handleShow} className="ml-1 user-account-address">
								{props.account.slice(0, 6) + "..." + props.account.slice(-4)}
							</span>
						</div>
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
