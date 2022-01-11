import React, { useState, useEffect } from "react"
import "./App.css"
import { Route, Routes, useNavigate } from "react-router"
import MainPage from "./MainPage"
import useLoginStatus from "./hooks/useLoginStatus"
import LoginScene from "./Scenes/Login/LoginScene"
import DateAdapter from "@mui/lab/AdapterDateFns"
import { LocalizationProvider } from "@mui/lab"

function App() {
    const useLogin = useLoginStatus()

    return (
        // <MainPage />
        <div stlye="width=100%">
            <LocalizationProvider dateAdapter={DateAdapter}>
                <Routes>
                    <Route path="/login" element={<LoginScene useLogin={useLogin} />} />
                    <Route path="/*" element={<MainPage useLogin={useLogin} />} />
                </Routes>
            </LocalizationProvider>
        </div>
    )
}

export default App
