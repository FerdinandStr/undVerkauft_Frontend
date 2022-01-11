import styles from "./NewItemScene.module.css"
import { DateTimePicker } from "@mui/lab"
import { Alert, Button, InputAdornment, TextField } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router"
import { postItemImg } from "../../api/fileRoutes"
import { postItem } from "../../api/itemRoutes"

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

export default function NewItemScene() {
    const navigate = useNavigate()
    const [newItem, setNewItem] = useState(initialItem)
    const [files, setFiles] = useState([])
    const [errorMsg, setErrorMsg] = useState()

    function handleItemChange(obj) {
        setNewItem((prevItem) => ({ ...prevItem, ...obj }))
    }

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

    function save() {
        postItem(newItem)
            .then((dbItem) => {
                console.log("What?", dbItem)

                postItemImg(dbItem._id, files)
                    .then((res) => {
                        console.log("RESSSUSUSUSUUSUS", res)
                        console.log(1)
                        console.log()
                        console.log("navigage?", "/items/" + dbItem._id)
                        console.log(2)
                        navigate("/items/" + dbItem._id)
                    })
                    .catch(showErrorMessage)
            })
            .catch(showErrorMessage)
    }

    return (
        <div>
            <h1>Create new Item</h1>
            <TextField id="outlined-basic" label="Artikelname" variant="outlined" onChange={(e) => handleItemChange({ name: e.target.value })} />
            <TextField
                id="outlined-basic"
                label="Beschreibung"
                multiline
                variant="outlined"
                onChange={(e) => handleItemChange({ description: e.target.value })}
            />
            <h2>Angebot</h2>
            <TextField
                id="outlined-adornment-amount"
                label="Startpreis"
                value={newItem.offer.askPrice}
                onChange={(e) => handleItemChange({ offer: { ...newItem.offer, askPrice: e.target.value } })}
                InputProps={{
                    endAdornment: <InputAdornment position="start">€</InputAdornment>,
                    className: styles.InputAskPrice,
                }}
            />
            <DateTimePicker
                label="Start Datum"
                value={newItem.offer.startDate}
                onChange={(date) => handleItemChange({ offer: { ...newItem.offer, startDate: date } })}
                renderInput={(params) => <TextField {...params} />}
            />
            <DateTimePicker
                label="End Datum"
                value={newItem.offer.endDate}
                onChange={(date) => handleItemChange({ offer: { ...newItem.offer, endDate: date } })}
                renderInput={(params) => <TextField {...params} />}
            />

            <input type="file" name="Bild hochladen" multiple onChange={(e) => setFiles(e.target.files)} />

            {errorMsg ? <Alert severity="error">{errorMsg}</Alert> : null}

            <button className={styles.CreateItemButton + " DefaultButton"} onClick={save}>
                Artikel erstellen
            </button>
        </div>
    )
}
