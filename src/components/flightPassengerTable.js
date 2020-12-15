exports.futureFlight = [
    {
        Header: "Id",
        accessor: "id",
        disableFilters: true,
    },
    {
        Header: "Flight Address",
        accessor: "flight",
        Cell: ({value}) => value.slice(0, 6) + "..." + value.slice(-4)
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
	}
]

exports.pastFlight = [
    {
        Header: "Id",
        accessor: "id",
        disableFilters: true,
    },
    {
        Header: "Flight Address",
        accessor: "flight",
        Cell: ({value}) => value.slice(0, 6) + "..." + value.slice(-4)
    },
    {
        Header: "Base Fair (ETH)",
        accessor: "baseFare",
        Cell: ({ value }) => parseInt(value) / 1e18,
    },
    {
        Header: "Flight Status",
        accessor: "statusString",
    },
    {
        Header: "Delay Withdraw",
        accessor: "delayWithdraw",
    },
];
