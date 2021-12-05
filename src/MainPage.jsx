import React from "react"
import { Route, Routes } from "react-router"
import Footer from "./components/Footer"
import Header from "./components/Header/Header"
import useSearchResult from "./hooks/useSearchResult"
// import useLoginStatus from "./hooks/useLoginStatus"
// import LoginScene from "./Scenes/LoginScene"
import SearchScene from "./Scenes/Search/SearchScene"

function MainPage() {
    // const test = useLoginStatus()

    //page after Login
    //login handle with App.js
    const { items, setSearchInput } = useSearchResult()

    return (
        <div>
            <Header setSearchInput={setSearchInput} />
            <Routes>
                <Route index element={<SearchScene items={items} />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default MainPage
