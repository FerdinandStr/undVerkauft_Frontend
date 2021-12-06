import React from "react"
import ItemCard from "./ItemCard/ItemCard.jsx"
import styles from "./SearchScene.module.css"

function SearchScene(params) {
    const { items } = params

    return <div className={styles.ItemCardsContainer}>{items ? items.map((item) => <ItemCard item={item} />) : null}</div>
}

export default SearchScene
