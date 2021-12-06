import style from "./ItemCard.module.css"

export default function ItemCard(props) {
    const { item } = props

    const lastBid = item.offer ? item.offer.bidList[item.offer.bidList.length - 1] : null
    const lastPrice = lastBid ? lastBid.bid : null
    return (
        <div id={item.id} className={style.ItemCard}>
            <img />
            <div>
                <p className={style.ItemName}>{item.name}</p>
                <p className={style.ItemDesc}>{item.description}</p>
                <p className={style.ItemPrice}>{lastPrice} €</p>
            </div>
        </div>
    )
}
