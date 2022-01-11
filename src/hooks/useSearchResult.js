import { useEffect, useState } from "react"
import { getItems } from "../api/itemRoutes"

export default function useSearchResult(init) {
    const [searchInput, setSearchInput] = useState(init)
    const [items, setItems] = useState([])

    useEffect(() => {
        getItems({ name: searchInput, activeOffer: true })
            .then((data) => {
                console.log("Item SearchResult", data)
                setItems(data)
            })
            .catch((err) => {
                console.log("ItemSearch error", err)
            })
    }, [searchInput])

    return { items, setSearchInput }
}
