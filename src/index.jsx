import { CssBaseline, ThemeProvider } from "@mui/material"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import "./globalStyle.css"
import "./index.css"
import { theme } from "./muiTheme.js"

ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <CssBaseline />
        </ThemeProvider>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
    import.meta.hot.accept()
}
