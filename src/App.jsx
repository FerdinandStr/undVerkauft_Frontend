import React, { useState, useEffect } from "react"
import "./App.css"
import { Route, Routes, useNavigate } from "react-router"
import MainPage from "./MainPage"
import useLoginStatus from "./hooks/useLoginStatus"
import LoginScene from "./Scenes/Login/LoginScene"

function App() {
    const navigate = useNavigate()
    const useLogin = useLoginStatus()
    const [isLoggedIn] = useLogin

    console.log(isLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("../login", { replace: true })
        }
    }, [isLoggedIn])

    return (
        // <MainPage />
        <div stlye="width=100%">
            <Routes>
                <Route path="/login" element={<LoginScene useLogin={useLogin} />} />
                <Route path="/*" element={<MainPage />} />
            </Routes>
        </div>
    )
}

export default App
