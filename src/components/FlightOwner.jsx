import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { flightOwnerDetails } from "./utils";
import { COLUMNS } from "./flightOwnerColumns";
import FlightOwnerTable from "./FlightOwnerTable";
import { withdrawMoney } from "./utils";

export default function FlightOwner({ web3, account }) {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const withdrawOwnerMoney = async (flightAddress) => {
    try {
      setLoading(true);
      if (web3 === undefined) throw new Error("Web3 not defined");
      await withdrawMoney(web3, flightAddress);
      setLoading(false);
    } catch (e) {
      console.error(e);
      alert(`Some error\n${e.message}`);
      setLoading(false);
    }
  };
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        if (web3 === undefined || account.length === 0) return;
        const ownerDetailsArray = await flightOwnerDetails(web3, account);
        setTableData(ownerDetailsArray);
        setLoading(false);
      } catch (e) {
        console.error(`Error at FlightOwner ${e.message}`);
      }
    };
    init();
  }, [web3, account]);

  const columns = useMemo(() => COLUMNS, []);

  if (tableData.length === 0 && !loading) {
    return (
      <div id="available-flight">
        <span>
          No flights available. Add a{" "}
          <Link to="/add" className="decorated-a">
            Flight
          </Link>
          .
        </span>
      </div>
    );
  }
  return (
    <div className="jumbotron py-3 pb-0">
      <h3 className="mb-3">Flights You Own</h3>
      <FlightOwnerTable data={tableData} columns={columns} withdrawOwnerMoney={withdrawOwnerMoney} />
      {loading && <Spinner className="text-align-center" animation="border" role="status" />}
    </div>
  );
}
