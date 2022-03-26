import { FilterMenuBar } from "../../components/FilterMenuBar"
import ItemSearchScene from "./ItemSearchScene"
import React from "react"

export default function MainSearchContainer({ filterState }) {
    const { filterArray } = filterState
    return (
        <>
            <FilterMenuBar filterState={filterState} />
            <ItemSearchScene filterArray={filterArray} />
        </>
    )
}
