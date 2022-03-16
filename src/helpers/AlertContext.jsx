import React, { useState } from "react"
import { Alert, Snackbar } from "@mui/material"

export const AlertContext = React.createContext()

//Dieser Context ist dafür zuständig, dass von allen Componenten aus global Fehlermeldungen an die Hauptoberfläche gepusht werden können,
// ohne dass in jeder Componente eine neue Snackbar/Alert importiert werden muss und jeglicher weiterer Overhead aufgeräumt wird

export function AlertContextProvider({ children }) {
    //Snackbar State => Context is used to send Alerts from Child components via sendAlert() back to MainPage (persitent even after route change)//
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        Alert: null,
    })
    function handleSnackbarClose(event, reason) {
        if (reason === "clickaway") {
            return
        }
        setSnackbarState({ ...snackbarState, open: false })
    }
    function sendCustomAlert(makeAlert) {
        setSnackbarState({ ...snackbarState, Alert: makeAlert(handleSnackbarClose), open: true })
    }

    function sendAlert(message, severity) {
        const alertType = severity || "errror"

        const alert = (
            <Alert onClose={handleSnackbarClose} severity={alertType} sx={{ width: "100%" }}>
                {message}
            </Alert>
        )
        setSnackbarState({ ...snackbarState, Alert: alert, open: true })
    }

    return (
        <>
            <Snackbar
                open={snackbarState.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                {snackbarState.Alert}
            </Snackbar>

            <AlertContext.Provider value={{ sendCustomAlert, sendAlert }}>{children}</AlertContext.Provider>
        </>
    )
}
