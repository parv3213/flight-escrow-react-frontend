import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { getPastFlightsDetails, getPastFlightAddedEvent } from "./utils";
import AvailableFlightTable from "./AvailableFlightTable";
import { COLUMNS } from "./columns";

export default function AvailableFlight(props) {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = useMemo(() => COLUMNS, []);

    useEffect(() => {
        const init = async () => {
            try {
                setLoading(true);
                if (props.web3 === undefined) return;
                const allFlightAddresses = await getPastFlightAddedEvent(props.web3);
                const flightsDetails = await getPastFlightsDetails(props.web3, allFlightAddresses);
                setTableData(flightsDetails);
                setLoading(false);
            } catch (e) {
                console.error(`Error at AvailableFlight ${e.message}`);
            }
        };
        init();
    }, [props.web3]);

    if (tableData.length === 0 && !loading) {
        return (<div id="available-flight"><span>No flights available. Add a <Link to="/add" className="decorated-a">Flight</Link>.</span></div>);
    }
    return (
        <div className="jumbotron py-3 pb-0">
            <h3 className="mb-3" >Available Flight</h3>
            <AvailableFlightTable data={tableData} columns={columns} />
            {loading && <Spinner className="text-align-center" animation="border" role="status" />}
        </div>
    );
}
