import React, { useContext, useEffect, useState } from "react"
import { getItemsByQuery } from "../../api/itemRoutes.js"
import { AlertContext } from "../../helpers/AlertContext.jsx"
import ItemCard from "./ItemCard/ItemCard.jsx"
import styles from "./ItemSearchScene.module.css"

export default function ItemSearchScene(params) {
    const { catchAlert } = useContext(AlertContext)
    //INFO: search field in Header and data in MainPage
    const { filterArray } = params
    const [items, setItems] = useState([])

    // console.log("Filter Array on Serach", filterArray)
    const queryParams = filterArray.reduce((acc, current) => {
        return { ...acc, [current.param]: [...(acc[current.param] || []), current.value] }
    }, {})

    useEffect(() => {
        getItemsByQuery(queryParams)
            // getItems({ name: searchInput, activeOffer: true })
            .then((data) => {
                setItems(data)
            })
            .catch(catchAlert)
    }, [filterArray])

    return <div className={styles.ItemCardsContainer}>{items ? items.map((item) => <ItemCard key={item._id} item={item} />) : null}</div>
}
