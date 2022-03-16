import { FilterMenuBar } from "../../components/FilterMenuBar"
import ItemSearchScene from "./ItemSearchScene"
import React from "react"

export default function MainSearchContainer({ searchInput, filterState }) {
    const [filterArray] = filterState
    return (
        <>
            <FilterMenuBar filterState={filterState} />
            <ItemSearchScene searchInput={searchInput} filterArray={filterArray} />
        </>
    )
}
