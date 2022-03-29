import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ImageSlider from "../../../components/ImageSlider/ImageSlider"
import RemainingTime from "../../../components/RemainingTime/RemainingTime"
import { BASE_URL } from "../../../helpers/rest"
import styles from "./ItemCard.module.css"

function useForceUpdate() {
    const [trigger, setValue] = useState(0)
    function forceUpdate() {
        setValue((value) => value + 1)
    }
    return [trigger, forceUpdate]
}

export default function ItemCard({ item }) {
    const [trigger, forceUpdate] = useForceUpdate()
    let lastPrice
    let lastBidUser

    if (item.offer) {
        const bidList = item.offer.bidList || null
        const lastBid = bidList && bidList[bidList.length - 1] ? bidList[bidList.length - 1] : null
        lastPrice = lastBid ? lastBid.bid : null || item.offer.askPrice
        lastBidUser = lastBid ? lastBid.userId.username : false

        //update running auctions every second or minute//
        useEffect(() => {
            const remainingMsec = Math.abs(Date.now() - new Date(item.offer.endDate))
            let timer
            if (!(remainingMsec < 0)) {
                if (!(remainingMsec > 1000 * 60 * 60)) {
                    timer = setInterval(() => {
                        forceUpdate()
                    }, 1000)
                } else {
                    timer = setInterval(() => {
                        forceUpdate()
                    }, 10000)
                }
            }
            return () => clearInterval(timer)
        }, [])
    }

    //-----//
    // const [imageUrlArray, setImageUrlArray] = useState()
    const imageUrlArray = item.picList.map((pic) => BASE_URL + "/files/itemImg/" + pic.filename)
    // setImageUrlArray(item.picList.map((pic) => BASE_URL + "/files/itemImg/" + pic.filename))

    return (
        <div className={styles.ItemCard}>
            <ImageSlider imgUrlArray={imageUrlArray} itemId={item._id} />
            <div>
                <Link to={"/items/" + item._id}>
                    <p className={styles.ItemName}>{item.name}</p>
                </Link>
                <p className={styles.ItemDesc}>{item.description}</p>
                {item.offer ? (
                    <>
                        <p>
                            <span className={styles.ItemPrice}>{lastPrice} € </span>
                            geboten von <span className={styles.ItemPrice}>{lastBidUser}</span>
                        </p>
                        <RemainingTime startDate={item.offer.startDate} endDate={item.offer.endDate} />{" "}
                    </>
                ) : null}
            </div>
        </div>
    )
}
