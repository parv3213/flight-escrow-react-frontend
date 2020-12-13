export const COLUMNS = [
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
        Header: "Claim Time",
        accessor: "claimTime",
        Cell: ({ value }) => new Date(value).toLocaleString(),
    },
    {
        Header: "Status",
        accessor: "status",
    },
    {
        Header: "Claim Now",
        accessor: "flight",
        id: "Claim address",
        disableFilters: true,
    }
];
