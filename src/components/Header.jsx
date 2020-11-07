import React, { useState, useEffect } from 'react'
import logo from "../public/airplane.png";

export default function Header(props) {
    const [networkName, setNetworkName] = useState("Undefined Network")
    
    useEffect(() => {
        const findNetworkName = () => {
            console.log(props.networkId);
            if (props.networkId === 42){
                setNetworkName("Kovan")
            } else if (props.networkId === 1){
                setNetworkName("Mainnet")
            }
        }
        findNetworkName();
    }, [props.networkId, props.accountBalance])
    return(
        <div>
            <nav className="navbar navbar-expand-lg my-3">
                <img src={logo} alt="Airplane" style={{"width": "25px", "heigh": "25px"}}/>
                <a href="#" className="navbar-brand mr-auto ml-2">Flight Escrow</a>
                <div className="ml-auto">
                    <span className="mx-3">{networkName}</span>
                    <span className="mx-3">{props.accountBalance} ETH</span>
                    <span className="ml-3">{props.account.slice(0, 6) + "..." + props.account.slice(-4)}</span>
                </div>
            </nav>
            <hr className="my-0"/>
        </div>
    )
}
