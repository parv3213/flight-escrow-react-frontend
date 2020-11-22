import React from "react";

export default function ColumnFilter({ column }) {
    const { filterValue, setFilter } = column;
    return (
        <span>
            <input className="form-control-sm" value={filterValue || ""} onChange={(e) => setFilter(e.target.value)} />
        </span>
    );
}
