import React from "react"
import styles from "./NewItemScene.module.css"
import { DateTimePicker } from "@mui/lab"
import { InputAdornment, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { postItemImg } from "../../api/fileRoutes"
import { getItemById, postItem, updateItem } from "../../api/itemRoutes"
import { useParams } from "react-router-dom"
import { AlertContext } from "../../helpers/AlertContext"

export default function NewItemScene() {
    const { catchAlert } = useContext(AlertContext)
    const { itemId } = useParams()
    const updateMode = !!itemId
    const navigate = useNavigate()
    const [files, setFiles] = useState([])
    const [errorFields, setErrorFields] = useState()

    const [item, setItem] = useState({
        name: "",
        description: "",
        picList: [],
        detailList: {},
        offer: {
            askPrice: 1,
            startDate: new Date(),
            endDate: new Date(),
        },
    })

    function handleItemChange(obj) {
        setItem((prevItem) => ({ ...prevItem, ...obj }))
    }

    useEffect(() => {
        if (itemId) {
            getItemById(itemId)
                .then((item) => {
                    console.log(item)
                    setItem(item)
                })
                .catch(catchAlert)
        }
    }, [itemId])

    async function save() {
        try {
            const startDate = item.offer.startDate || new Date()
            const endDate = item.offer.endDate || new Date(startDate.getTime() + 900000) //15 min default

            console.log(startDate, endDate)

            const dbItem = await postItem({ ...item, offer: { ...item, startDate, endDate } })
            if (files.length > 0) {
                await postItemImg(dbItem._id, files)
            }
            navigate("/items/" + dbItem._id)
        } catch (e) {
            catchAlert(e)
            setErrorFields(e.fields || null)
        }
    }

    async function update() {
        try {
            await updateItem(itemId, item)
            if (files.length > 0) {
                await postItemImg(itemId, files)
            }
            navigate("/items/" + itemId)
        } catch (e) {
            catchAlert(e)
            setErrorFields(e.fields || null)
        }
    }

    return (
        <div>
            <h1>Create new Item</h1>
            <TextField
                error={errorFields ? errorFields.includes("name") : false}
                id="name"
                label="Artikelname"
                variant="outlined"
                value={item.name}
                onChange={(e) => handleItemChange({ name: e.target.value })}
            />
            <TextField
                error={errorFields ? errorFields.includes("description") : false}
                id="description"
                label="Beschreibung"
                multiline
                variant="outlined"
                value={item.description}
                onChange={(e) => handleItemChange({ description: e.target.value })}
            />
            <h2>Angebot</h2>
            <TextField
                error={errorFields ? errorFields.includes("askPrice") : false}
                id="askPrice"
                label="Startpreis"
                value={item.offer.askPrice}
                onChange={(e) => handleItemChange({ offer: { ...item.offer, askPrice: e.target.value } })}
                InputProps={{
                    endAdornment: <InputAdornment position="start">€</InputAdornment>,
                    className: styles.InputAskPrice,
                }}
            />
            <DateTimePicker
                type="date"
                label="Start Datum"
                value={item.offer.startDate}
                onChange={(date) => handleItemChange({ offer: { ...item.offer, startDate: date } })}
                renderInput={(params) => <TextField {...params} error={errorFields ? errorFields.includes("startDate") : false} />}
            />
            <DateTimePicker
                error={errorFields ? errorFields.includes("endDate") : false}
                type="date"
                label="End Datum"
                value={item.offer.endDate}
                onChange={(date) => handleItemChange({ offer: { ...item.offer, endDate: date } })}
                renderInput={(params) => <TextField {...params} error={errorFields ? errorFields.includes("endDate") : false} />}
            />

            <input type="file" name="Bild hochladen" multiple onChange={(e) => setFiles(e.target.files)} />

            {updateMode ? (
                <button className={styles.CreateItemButton + " DefaultButton"} onClick={update}>
                    Artikel aktuallisieren
                </button>
            ) : (
                <button className={styles.CreateItemButton + " DefaultButton"} onClick={save}>
                    Artikel erstellen
                </button>
            )}
        </div>
    )
}
