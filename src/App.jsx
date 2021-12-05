import React, { useState, useEffect } from "react"
import "./App.css"
import { Route, Routes } from "react-router"
import MainPage from "./MainPage"

function App() {
    return (
        // <MainPage />
        <Routes>
            <Route path="/*" element={<MainPage />} />
        </Routes>
    )
}

export default App
