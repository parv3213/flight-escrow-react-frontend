import React from "react";
import { useState } from "react";
import { raiseDispute } from "./utils";

export default function FlightDispute({ web3 }) {
	// State Variables
	const [disputeFlightAddress, setDisputeFlightAddress] = useState(undefined);

	const raiseDisputeUI = async () => {
		if (disputeFlightAddress != undefined) {
			try {
				await raiseDispute(web3, disputeFlightAddress);
			} catch (e) {
				alert(`Some error!\n${e.message}`);
			}
		} else {
			alert("Enter valid flight address");
		}
	};
	return (
		<div className="jumbotron py-3 pb-0">
			<h3 className="mb-3">Raise a dispute</h3>
			<div className="input-group mb-3 mr-3">
				<div className="input-group-prepend">
					<span className="input-group-text">Dispute Flight Address</span>
				</div>
				<input
					type="text"
					placeholder="0x"
					onChange={(e) => setDisputeFlightAddress(e.target.value)}
					required
				/>
			</div>
			<button type="submit" className="btn btn-warning" onClick={raiseDisputeUI}>
				Raise Dispute
			</button>
		</div>
	);
}
