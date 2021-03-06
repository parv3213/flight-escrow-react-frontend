import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Landing from "./Landing.jsx";
import Header from "./Header.jsx";
import AddFlight from "./AddFlight.jsx";
import AvailableFlight from "./AvailableFlight.jsx";
import ConfirmAndBook from "./ConfirmAndBook.jsx";
import FlightOwner from "./FlightOwner.jsx";
import FlightPassenger from "./FlightPassenger.jsx";
import FlightDispute from "./FlightDispute.jsx";
import Footer from "./Footer.jsx";
import Web3 from "web3";

const { REACT_APP_NETWORK_ID } = process.env;

export default function App() {
	const [web3, setWeb3] = useState(undefined);
	const [account, setAccount] = useState("");
	const [accountBalance, setAccountBalance] = useState("");
	const [networkId, setNetworkId] = useState(0);
	const [metamaskChange, setMetaMaskChange] = useState(true);
	const [wrongNetwork, setWrongNetwork] = useState(false);
	const [refresh, setRefresh] = useState(true);
	const [loading, setLoading] = useState(true);
	const handleClose = () => {
		setMetaMaskChange(!metamaskChange);
		setWrongNetwork(false);
	};

	// ! make a separate file
	const getWeb3 = () => {
		return new Promise(async (resolve, reject) => {
			if (window.ethereum) {
				const web3 = new Web3(window.ethereum);
				try {
					await window.ethereum.send('eth_requestAccounts');
					// await window.ethereum.enable();
					resolve(web3);
				} catch (e) {
					reject(e);
				}
			} else if (window.web3) {
				resolve(window.web3);
			} else {
				window.alert("Must install Metamask Extension!\nDApp will not load");
				reject("Must install Metamask Extension!");
			}
		});
	};

	useEffect(() => {
		const init = async () => {
			const web3 = await getWeb3();
			const account = (await web3.eth.getAccounts())[0];
			const networkId = await web3.eth.net.getId();
			if (networkId !== parseInt(REACT_APP_NETWORK_ID)) {
				console.log("Not correct", networkId, REACT_APP_NETWORK_ID);
				setWrongNetwork(true);
			}
			const accountBalance =
				Math.floor(parseFloat(web3.utils.fromWei(await web3.eth.getBalance(account))) * 100) / 100;
			setWeb3(web3);
			setAccount(account);
			setNetworkId(networkId);
			setAccountBalance(accountBalance);
		};
		setLoading(true);
		init();
		setLoading(false);
	}, [metamaskChange, refresh]);

	useEffect(() => {
		window.ethereum.on("accountsChanged", () => {
			console.warn("Account changed");
			setMetaMaskChange((m) => !m);
		});
		window.ethereum.on("chainChanged", () => {
			console.warn("Chain changed");
			setMetaMaskChange((m) => !m);
		});
	}, []);

	return (
		<Router>
			<Header networkId={networkId} account={account} accountBalance={accountBalance} />
			<div className="container">
				{loading === true ? <Spinner className="text-align-center" animation="border" role="status" /> : null}
				<Switch>
					<Route path="/add">
						<AddFlight web3={web3} account={account} refresh={refresh} setRefresh={setRefresh} />
					</Route>
					<Route path="/flights">
						<AvailableFlight web3={web3} />
					</Route>
					<Route path="/bookTicket">
						<ConfirmAndBook web3={web3} />
					</Route>
					<Route path="/flightOwner">
						<FlightOwner web3={web3} account={account} />
					</Route>
					<Route path="/flightPassenger">
						<FlightPassenger web3={web3} account={account} />
					</Route>
					<Route path="/FlightDispute">
						<FlightDispute web3={web3} account={account} />
					</Route>
					<Route path="/">
						<Landing />
					</Route>
				</Switch>
				<Modal show={wrongNetwork} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Please switch to Kovan</Modal.Title>
					</Modal.Header>
					<Modal.Body>Click on metamask and change to Kovan</Modal.Body>
				</Modal>
			</div>
			<Footer />
		</Router>
	);
}
