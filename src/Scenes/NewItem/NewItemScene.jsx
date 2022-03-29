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
    const { sendAlert, catchAlert } = useContext(AlertContext)
    const { itemId } = useParams()
    const updateMode = !!itemId
    const navigate = useNavigate()
    const [files, setFiles] = useState([])
    const [errorFields, setErrorFields] = useState()
    let nowDate = new Date()

    const defaultItem = {
        name: "",
        description: "",
        picList: [],
        detailList: {},
        offer: {
            askPrice: 1,
            startDate: nowDate,
            endDate: nowDate.getTime() + 900000,
        },
    }
    const [item, setItem] = useState(defaultItem)

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
        } else {
            setItem(defaultItem)
        }
    }, [itemId])

    async function save() {
        try {
            //15 min default
            nowDate = new Date()
            const startDate = item.offer.startDate // || nowDate
            const endDate = item.offer.endDate // || nowDate.getTime() + 900000

            const dbItem = await postItem({ ...item, offer: { ...item.offer, startDate, endDate } })
            if (files.length > 0) {
                await postItemImg(dbItem._id, files)
            }

            sendAlert("Artikel gespeichert!", "success")
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

            sendAlert("Artikel aktuallisiert!", "success")
            navigate("/items/" + itemId)
        } catch (e) {
            catchAlert(e)
            setErrorFields(e.fields || null)
        }
    }

    return (
        <div className={styles.NewItemContainer}>
            <h1>Neuen Artikel verkaufen</h1>
            <div>
                <TextField
                    error={errorFields ? errorFields.includes("name") : false}
                    id="name"
                    label="Artikelname"
                    variant="outlined"
                    value={item.name}
                    onChange={(e) => handleItemChange({ name: e.target.value })}
                />
            </div>
            <div>
                <TextField
                    error={errorFields ? errorFields.includes("description") : false}
                    id="description"
                    label="Beschreibung"
                    multiline
                    variant="outlined"
                    value={item.description}
                    onChange={(e) => handleItemChange({ description: e.target.value })}
                />
            </div>
            <h2>Angebot</h2>
            <div>
                <TextField
                    error={errorFields ? errorFields.includes("askPrice") : false}
                    id="askPrice"
                    label="Startpreis"
                    value={item.offer.askPrice}
                    onChange={(e) => {
                        if (/^\d{1,12}$/.test(e.target.value)) {
                            handleItemChange({ offer: { ...item.offer, askPrice: parseInt(e.target.value) } })
                        }
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="start">€</InputAdornment>,
                        className: styles.InputAskPrice,
                    }}
                />
            </div>
            <div>
                <DateTimePicker
                    type="date"
                    label="Start Datum"
                    minDateTime={nowDate}
                    inputFormat="dd.MM.yyyy HH:mm"
                    value={item.offer.startDate}
                    onChange={(date) => handleItemChange({ offer: { ...item.offer, startDate: date } })}
                    renderInput={(params) => <TextField {...params} error={errorFields ? errorFields.includes("startDate") : false} />}
                />
            </div>
            <div>
                <DateTimePicker
                    type="date"
                    label="End Datum"
                    minDateTime={nowDate.getTime() + 900000}
                    inputFormat="dd.MM.yyyy HH:mm"
                    value={item.offer.endDate}
                    onChange={(date) => handleItemChange({ offer: { ...item.offer, endDate: date } })}
                    renderInput={(params) => <TextField {...params} error={errorFields ? errorFields.includes("endDate") : false} />}
                />
            </div>
            <h2>Bilder hochladen</h2>
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
