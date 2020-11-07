import React, { useState, useEffect } from "react";
import Web3 from "web3";

export default function App() {
  const [web3, setWeb3] = useState(Object);
  const [account, setAccount] = useState("");

  useEffect(() => {
    const init = async() => {
      const web3 = new Web3(Web3.givenProvider) 
      const account = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      console.log(process.env);
      // console.log(process.env.REACT_APP_NETWORK_ID);
      setWeb3(web3)
      setAccount(account)
    }
    init();
  }, []) //! check functionality

  return (
    <div>
      <div>Hello</div>
    </div>
  );
}
