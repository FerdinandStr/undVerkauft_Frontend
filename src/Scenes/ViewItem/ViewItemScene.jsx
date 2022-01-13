import { Alert } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { deleteItemById, getItemById } from "../../api/itemRoutes"
import ImageSlider from "../../components/ImageSlider/ImageSlider"
import { BASE_URL } from "../../helpers/rest"
import { AlertContext } from "../../MainPage"
import styles from "./ViewItemScene.module.css"

export default function ViewItemScene(props) {
    const navigate = useNavigate()
    const sendAlert = useContext(AlertContext)

    const { itemId } = useParams()
    const { useLogin } = props
    const [{ username, userId }] = useLogin

    //get Item and Info //
    const [item, setItem] = useState()
    const [imageUrlArray, setImageUrlArray] = useState()
    const isUserItemCreator = item && userId ? item.creationUser == userId : false

    useEffect(() => {
        getItemById(itemId)
            .then((item) => {
                console.log("ITEM", item)
                setItem(item)
                setImageUrlArray(item.picList.map((pic) => BASE_URL + "/files/itemImg/" + pic.filename))
                // item.picList = item.picList.map((pic) => ({ ...pic, url: BASE_URL + "/files/itemImg/" + pic.filename }))
            })
            .catch(() => {
                console.log("ERROR ITEM NOT FOUND!")
            })
    }, [itemId])

    // const offer = {
    //     item.offer ?//TODO

    // }

    function deleteItem() {
        deleteItemById(itemId)
            .then((res) => {
                console.log("Item deleted!", res)
                //FUCKING BOSS MOVE// send Alert with context to MainPage to persist on transition
                sendAlert((handleClose) => (
                    <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                        Item deleted successfully!
                    </Alert>
                ))
                navigate("/items")
            })
            .catch((e) => {
                console.log("ERROR DELETING ITEM", e)
            })
    }

    return item ? (
        <div>
            <h1>{item.name}</h1>
            <p>{item.description}</p>

            <ImageSlider imgUrlArray={imageUrlArray} />

            {isUserItemCreator ? (
                <div>
                    <Link to={"/items/update/" + itemId}>
                        <button className={" DefaultButton"}>Modify</button>
                    </Link>
                    <button className={styles.DeleteButton + " DefaultButton"} onClick={deleteItem}>
                        Delete
                    </button>
                </div>
            ) : null}
        </div>
    ) : (
        <div>please wait...</div>
    )
}
