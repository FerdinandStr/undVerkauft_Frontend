import styles from "./NewItemScene.module.css"
import { DateTimePicker } from "@mui/lab"
import { Alert, Button, InputAdornment, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { postItemImg } from "../../api/fileRoutes"
import { getItemById, postItem, updateItem } from "../../api/itemRoutes"
import { useParams } from "react-router-dom"

function showErrorMessage(e) {
    console.log("ERROR", e)
    if (e.messages) {
        return e.messages[0]
    } else if (e.error) {
        return e.error
    } else {
        console.log(e)
    }
}

export default function NewItemScene() {
    const { itemId } = useParams()
    const updateMode = !!itemId
    const navigate = useNavigate()
    const [files, setFiles] = useState([])
    const [errorMsg, setErrorMsg] = useState() //TODO?

    const initialItem = {
        name: "",
        description: "",
        picList: [],
        detailList: {},
        offer: {
            askPrice: 1,
            startDate: new Date(),
            endDate: new Date(),
        },
    }
    const [item, setItem] = useState(initialItem)
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
                .catch((e) => {
                    console.log("Failed loading Item to Update!", e)
                    setErrorMsg("Failed loading Item to Update!")
                })
        }
    }, [itemId])

    async function save() {
        try {
            const dbItem = await postItem(item)
            if (files.length > 0) {
                await postItemImg(dbItem._id, files)
            }
            navigate("/items/" + dbItem._id)
        } catch (e) {
            showErrorMessage(e)
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
            showErrorMessage(e)
        }
    }

    return (
        <div>
            <h1>Create new Item</h1>
            <TextField
                id="outlined-basic"
                label="Artikelname"
                variant="outlined"
                value={item.name}
                onChange={(e) => handleItemChange({ name: e.target.value })}
            />
            <TextField
                id="outlined-basic"
                label="Beschreibung"
                multiline
                variant="outlined"
                value={item.description}
                onChange={(e) => handleItemChange({ description: e.target.value })}
            />
            <h2>Angebot</h2>
            <TextField
                id="outlined-adornment-amount"
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
                renderInput={(params) => <TextField {...params} />}
            />
            <DateTimePicker
                type="date"
                label="End Datum"
                value={item.offer.endDate}
                onChange={(date) => handleItemChange({ offer: { ...item.offer, endDate: date } })}
                renderInput={(params) => <TextField {...params} />}
            />

            <input type="file" name="Bild hochladen" multiple onChange={(e) => setFiles(e.target.files)} />

            {errorMsg ? <Alert severity="error">{errorMsg}</Alert> : null}

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
