import { Alert, Input, InputAdornment, TextField } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { deleteItemById, getItemById } from "../../api/itemRoutes"
import { postNewBid } from "../../api/offerRoutes"
import ImageSlider from "../../components/ImageSlider/ImageSlider"
import RemainingTime from "../../components/RemainingTime/RemainingTime"
import { AlertContext } from "../../helpers/AlertContext"
import { BASE_URL } from "../../helpers/rest"
import useForceUpdate from "../../hooks/useForceUpdate"
// import { AlertContext } from "../../MainPage"
import styles from "./ViewItemScene.module.css"

export default function ViewItemScene(props) {
    const navigate = useNavigate()
    const { sendCustomAlert, catchAlert } = useContext(AlertContext)
    const [trigger, forceUpdate] = useForceUpdate()

    const { itemId } = useParams()
    const { useLogin } = props
    const [loginUser] = useLogin //TODO cleanup
    const userId = loginUser.userId || null

    //get Item and Info //
    const [item, setItem] = useState()
    const [imageUrlArray, setImageUrlArray] = useState()
    const isUserItemCreator = item && userId ? item.creationUser == userId : false

    useEffect(() => {
        getItemById(itemId)
            .then((item) => {
                setItem(item)
                setImageUrlArray(item.picList.map((pic) => BASE_URL + "/files/itemImg/" + pic.filename))
                // item.picList = item.picList.map((pic) => ({ ...pic, url: BASE_URL + "/files/itemImg/" + pic.filename }))
            })
            .catch(catchAlert)
    }, [itemId, trigger])

    function deleteItem() {
        deleteItemById(itemId)
            .then((res) => {
                console.log("Item deleted!", res)
                //FUCKING BOSS MOVE// send Alert with context to MainPage to persist on transition
                sendCustomAlert((handleClose) => (
                    <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                        Item deleted successfully!
                    </Alert>
                ))
                navigate("/items")
            })
            .catch(catchAlert)
    }

    return item ? (
        <div className={styles.ViewItemContainer}>
            <h1>{item.name}</h1>
            <p>{item.description}</p>

            <ImageSlider imgUrlArray={imageUrlArray} />

            {isUserItemCreator ? (
                <div>
                    <Link to={"/items/update/" + itemId}>
                        <button className={" DefaultButton"}>Bearbeiten</button>
                    </Link>
                    <button className={styles.DeleteButton + " DefaultButton"} onClick={deleteItem}>
                        Löschen
                    </button>
                </div>
            ) : null}

            <BetArea item={item} forceUpdate={forceUpdate} />
        </div>
    ) : (
        <div>please wait...</div>
    )
}

function BetArea({ item, forceUpdate }) {
    const { sendAlert, catchAlert } = useContext(AlertContext)
    const offer = item.offer //TODO if empty^?
    const lastBidFromList = offer.bidList[offer.bidList.length - 1] ? offer.bidList[offer.bidList.length - 1] : null
    const lastBid = lastBidFromList ? lastBidFromList.bid : false || offer.askPrice || 0
    const lastBidUser = lastBidFromList ? lastBidFromList.userId.username : null

    const [bid, setBid] = useState(lastBid)

    function newBid() {
        postNewBid(item._id, bid)
            .then((res) => {
                console.log("Send Bid", res)
                sendAlert("Gebot gesendet!", "success")
                forceUpdate()
            })
            .catch(catchAlert)
    }

    useEffect(() => {
        const remainingMsec = Math.abs(Date.now() - new Date(offer.endDate))
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

    //Check if auction is over
    if (offer.startDate && new Date(offer.endDate) < new Date()) {
        return lastBidUser ? (
            <div className={styles.BetContainer}>
                <h2>&#x1F4B0; Der Artikel wurde verkauft! &#x1F4B0;</h2>
                <p>
                    Preis: <span className={styles.ItemPrice}>{lastBid} €</span>
                </p>
                <p>Gewinner: {lastBidUser}</p>
            </div>
        ) : (
            <div>Die Auktion ist beendet, leider hat niemand geboten. &#x1F625;</div>
        )
    }

    return (
        <div className={styles.BetContainer}>
            <RemainingTime startDate={offer.startDate} endDate={offer.endDate} />
            <h2>&#x1F525; Der Preis ist heiß &#x1F525;</h2>
            <p>
                {/* <p>{lastBidUser}</p> */}
                <span>Aktuelles Gebot:</span>
                <span className={styles.ItemPrice}> {lastBid} €</span>
                <p>
                    Von: <span className={styles.ItemPrice}>{lastBidUser}</span>
                </p>
            </p>
            <TextField
                id="outlined-adornment-amount"
                label="Gebot"
                type="number"
                value={bid}
                onChange={(e) => (/^\d{1,12}$/.test(e.target.value) ? setBid(parseInt(e.target.value)) : null)}
                InputProps={{
                    endAdornment: <InputAdornment position="start">€</InputAdornment>,
                    className: styles.InputAskPrice,
                }}
            />
            <button className="DefaultButton" onClick={newBid}>
                bieten &#x1F4B8;
            </button>
        </div>
    )
}
