import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTable, useSortBy, useFilters } from "react-table";
import ColumnFilter from "./ColumnFilter.jsx";

export default function AvailableFlightTable(props) {
    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFilter,
        };
    }, []);

    let { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
        { columns: props.columns, data: props.data, defaultColumn },
        useFilters,
        useSortBy
    );

    return (
        <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                style={{
                                    borderBottom: "solid 3px red",
                                    background: "aliceblue",
                                    color: "black",
                                    fontWeight: "bold",
                                }}
                            >
                                {column.render("Header")}
                                <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                                <div>{column.canFilter ? column.render("Filter") : null}</div>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: "10px",
                                            border: "solid 1px gray",
                                            background: "papayawhip",
                                        }}
                                    >
                                        {cell.column.id !== "flight" ? (
                                            cell.render("Cell")
                                        ) : (
                                            <button className="btn btn-light">
                                                <Link to={"/bookTicket/" + cell.value}>Book</Link>
                                            </button>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
