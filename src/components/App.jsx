import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Web3 from "web3";

const {REACT_APP_NETWORK_ID} = process.env;

export default function App() {
  const [web3, setWeb3] = useState(Object);
  const [account, setAccount] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [networkId, setNetworkId] = useState(0);

  useEffect(() => {
    const init = async() => {
      const web3 = new Web3(Web3.givenProvider) 
      const account = (await web3.eth.getAccounts())[0];
      const networkId = await web3.eth.net.getId();
      if (networkId !== parseInt(REACT_APP_NETWORK_ID)){
        console.log("Not correct",networkId,REACT_APP_NETWORK_ID ); //! render something here
      }
      const accountBalance = Math.floor(parseFloat(web3.utils.fromWei(await web3.eth.getBalance(account)))*100)/100
      setWeb3(web3)
      setAccount(account)
      setNetworkId(networkId)
      setAccountBalance(accountBalance);
    }
    init();
  }, []) //! check functionality

  return (
    <div>
      <Header 
        networkId = {networkId}
        account = {account}
        accountBalance = {accountBalance}
      />
      <div>Hello</div>
    </div>
  );
}
