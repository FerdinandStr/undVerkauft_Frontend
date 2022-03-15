import { React, useState } from "react"
import styles from "./index.module.css"

const defaultFilters2 = [
    { param: "endDate", value: "asc", desc: "Endet bald" },
    { param: "endDate", value: "desc", desc: "Endet nicht bald" },
    { param: "lastPrice", value: "asc", desc: "Niedrigster Preis" },
    { param: "lastPrice", value: "desc", desc: "Höchster Preis" },
    { param: "name", value: "" },
    { param: "desc", value: "name_lower" },
]

function useFilterState() {
    const filterState = useState([])
    const [filterArray, setFilterArray] = filterState

    function addSearchFilter(value) {
        if (!filterArray.some((filter) => filter.param === "name_lower" && filter.value === value)) {
            setFilterArray([...filterArray, { param: "name_lower", value: value }])
        }
    }

    return { filterState, addSearchFilter }
}

function FilterMenuBar({ filterState }) {
    const [filterArray, setFilterArray] = filterState
    return (
        <div>
            {filterArray.map((filter, i) => (
                <div key={i}>{filter.value}</div>
            ))}
        </div>
    )
}

export { useFilterState, FilterMenuBar }
