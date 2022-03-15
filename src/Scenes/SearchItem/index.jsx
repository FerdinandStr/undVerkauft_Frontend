import { FilterMenuBar } from "../../components/FilterMenuBar"
import ItemSearchScene from "./ItemSearchScene"

export default function MainSearchContainer({ searchInput, filterState }) {
    const [filterArray] = filterState
    return (
        <>
            <FilterMenuBar filterState={filterState} />
            <ItemSearchScene searchInput={searchInput} filterArray={filterArray} />
        </>
    )
}
