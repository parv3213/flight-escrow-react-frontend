export const COLUMNS = [
    {
        Header: "Id",
        accessor: "id",
        disableFilters: true,
    },
    {
        Header: "Departure",
        accessor: "departure",
    },
    {
        Header: "Arrival",
        accessor: "arrival",
    },
    {
        Header: "Date",
        accessor: "date",
        Cell: ({ value }) => new Date(value).toLocaleString(),
    },
    {
        Header: "Base Fair (ETH)",
        accessor: "baseFare",
        Cell: ({ value }) => parseInt(value) / 1e18,
    },
];
