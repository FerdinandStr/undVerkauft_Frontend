import React, { useEffect, useState } from "react"
import { getItems } from "../../api/itemRoutes.js"
import ItemCard from "./ItemCard/ItemCard.jsx"
import styles from "./ItemSearchScene.module.css"

export default function ItemSearchScene(params) {
    //INFO: search field in Header and data in MainPage
    const { searchInput } = params
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

    return <div className={styles.ItemCardsContainer}>{items ? items.map((item) => <ItemCard key={item._id} item={item} />) : null}</div>
}
