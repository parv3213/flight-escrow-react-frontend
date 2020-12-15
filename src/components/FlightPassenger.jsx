import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { flightPassengerDetails } from "./utils";
import { futureFlight, pastFlight } from "./flightPassengerTable";
import FlightPassengerFutureTable from "./FlightPassengerFutureTable";
import FlightPassengerPastTable from "./FlightPassengerPastTable";

export default function FlightPassenger({ web3, account }) {
  const [futureTableData, setFutureTableData] = useState([]);
  const [pastTableData, setPastTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        if (web3 === undefined || account.length === 0) return;
        const {passengerFutureFlights, passengerPastFlights} = await flightPassengerDetails(web3, account);
        setFutureTableData(passengerFutureFlights);
        setPastTableData(passengerPastFlights);
        setLoading(false);
      } catch (e) {
        console.error(`Error at FlightPassenger ${e.message}`);
      }
    };
    init();
  }, [web3, account]);

  const futureFlightColumns = useMemo(() => futureFlight, []);
  const pastFlightColumns = useMemo(() => pastFlight, []);

  if ((futureTableData.length !== 0 && pastTableData.length !== 0) && !loading) {
    return (
      <div id="available-flight">
        <span>
          No flights available. Book a{" "}
          <Link to="/flights" className="decorated-a">
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
      <FlightPassengerFutureTable data={futureTableData} columns={futureFlightColumns} />
      {loading && <Spinner className="text-align-center" animation="border" role="status" />}
      <hr className="my-3"/>
      <FlightPassengerPastTable data={pastTableData} columns={pastFlightColumns} />
      {loading && <Spinner className="text-align-center" animation="border" role="status" />}
    </div>
  );
}
