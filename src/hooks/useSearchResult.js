import { useEffect, useState } from "react"
import getItems from "../api/getItems"

export default function useSearchResult(init) {
    const [searchInput, setSearchInput] = useState(init)
    const [items, setItems] = useState()

    useEffect(() => {
        getItems({ name: searchInput })
            .then((res) => {
                console.log("RES", res)
                setItems(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [searchInput])

    return { items, setSearchInput }
}
