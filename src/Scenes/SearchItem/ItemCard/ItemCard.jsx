import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ImageSlider from "../../../components/ImageSlider/ImageSlider"
import { BASE_URL } from "../../../helpers/rest"
import styles from "./ItemCard.module.css"
import RemainingTime from "./RemainingTime"

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

    if (item.offer) {
        const lastBid = item.offer ? item.offer.bidList[item.offer.bidList.length - 1] : null
        lastPrice = lastBid ? lastBid.bid : null || item.offer.askPrice

        //update running auctions every second or minute//
        useEffect(() => {
            const remainingUnixTime = Math.abs(Date.now() - new Date(item.offer.endDate))
            let timer
            if (!(remainingUnixTime < 0)) {
                if (!(remainingUnixTime > -1000 * 60 * 60)) {
                    timer = setInterval(() => {
                        forceUpdate()
                    }, 1000)
                } else {
                    timer = setInterval(() => {
                        forceUpdate()
                    }, 1000)
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
            <ImageSlider imgUrlArray={imageUrlArray} />
            <div>
                <Link to={"/items/" + item._id}>
                    <p className={styles.ItemName}>{item.name}</p>
                </Link>
                <p className={styles.ItemDesc}>{item.description}</p>
                {item.offer ? (
                    <>
                        <p className={styles.ItemPrice}>{lastPrice} €</p>
                        <RemainingTime endDate={item.offer.endDate} />{" "}
                    </>
                ) : null}
            </div>
        </div>
    )
}
