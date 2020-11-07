import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";
import AddFlight from "./AddFlight.jsx";
import Web3 from "web3";

const { REACT_APP_NETWORK_ID } = process.env;

export default function App() {
  const [web3, setWeb3] = useState(undefined);
  const [account, setAccount] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [networkId, setNetworkId] = useState(0);
  const [metamaskChange, setMetaMaskChange] = useState(true);

  // ! make a separate file
  const getWeb3 = () => {
    return new Promise(async (resolve, reject) => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
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
        console.log("Not correct", networkId, REACT_APP_NETWORK_ID); //! render something here
      }
      const accountBalance = Math.floor(parseFloat(web3.utils.fromWei(await web3.eth.getBalance(account))) * 100) / 100
      setWeb3(web3)
      setAccount(account)
      setNetworkId(networkId)
      setAccountBalance(accountBalance);
    }
    init();
  }, [metamaskChange])

  useEffect(() => {
      window.ethereum.on("accountsChanged", () => {
        console.log("Account changed");
        setMetaMaskChange(m => !m)
      })
      window.ethereum.on("networkChanged", () => {
        console.log("Network changed");
        setMetaMaskChange(m => !m)
      })
  }, [])

  return (
    <div>
      <Header
        networkId={networkId}
        account={account}
        accountBalance={accountBalance}
      />
      <div className="container">
        <AddFlight
          web3={web3}
          account={account}
        />
      </div>
    </div>
  );
}
