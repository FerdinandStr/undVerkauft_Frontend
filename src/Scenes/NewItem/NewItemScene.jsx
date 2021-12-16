import styles from "./NewItemScene.module.css"
import { DateTimePicker } from "@mui/lab"
import { Alert, Button, FilledInput, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material"
import { textAlign } from "@mui/system"
import { useState } from "react"
import postItem from "../../api/postItem"
import { useNavigate } from "react-router"

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
    const [errorMsg, setErrorMsg] = useState()

    function handleChange(obj) {
        setNewItem((prevItem) => ({ ...prevItem, ...obj }))
    }

    console.log("NEW ITEM", newItem)

    function createNewItem(item) {
        setErrorMsg()
        console.log("RUN FOR ITEM", item)

        postItem(item)
            .then((res) => {
                console.log("DONE", res)

                //TODO antwort mit artikelid hohlen und dann router auf neue ID schicken => direkt öffnen des elements
                navigate("/")
            })
            .catch((e) => {
                if (e.messages) {
                    setErrorMsg(e.messages[0])
                } else {
                    setErrorMsg(e.error)
                }
            })
    }

    return (
        <div>
            <h1>Create new Item</h1>
            <TextField id="outlined-basic" label="Artikelname" variant="outlined" onChange={(e) => handleChange({ name: e.target.value })} />
            <TextField
                id="outlined-basic"
                label="Beschreibung"
                multiline
                variant="outlined"
                onChange={(e) => handleChange({ description: e.target.value })}
            />
            <h2>Angebot</h2>
            <TextField
                id="outlined-adornment-amount"
                label="Startpreis"
                value={newItem.offer.askPrice}
                onChange={(e) => handleChange({ offer: { ...newItem.offer, askPrice: e.target.value } })}
                InputProps={{
                    endAdornment: <InputAdornment position="start">€</InputAdornment>,
                    className: styles.InputAskPrice,
                }}
            />
            <DateTimePicker
                label="Start Datum"
                value={newItem.offer.startDate}
                onChange={(date) => handleChange({ offer: { ...newItem.offer, startDate: date } })}
                renderInput={(params) => <TextField {...params} />}
            />
            <DateTimePicker
                label="End Datum"
                value={newItem.offer.endDate}
                onChange={(date) => handleChange({ offer: { ...newItem.offer, endDate: date } })}
                renderInput={(params) => <TextField {...params} />}
            />

            {errorMsg ? <Alert severity="error">{errorMsg}</Alert> : null}

            <Button variant="contained" onClick={() => createNewItem(newItem)}>
                Artikel erstellen
            </Button>
        </div>
    )
}
