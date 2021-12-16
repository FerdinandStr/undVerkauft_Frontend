import React, { useState } from "react"
import { Route, Routes } from "react-router"
import Footer from "./components/Footer"
import Header from "./components/Header/Header"
import { SideMenu, useSideMenuState } from "./components/SideMenu/SideMenu"
import useSearchResult from "./hooks/useSearchResult"
import NewItemScene from "./Scenes/NewItem/NewItemScene"
// import useLoginStatus from "./hooks/useLoginStatus"
// import LoginScene from "./Scenes/LoginScene"
import SearchScene from "./Scenes/Search/SearchScene"

function MainPage() {
    // const test = useLoginStatus()

    //page after Login
    //login handle with App.js
    const { items, setSearchInput } = useSearchResult()
    const sideMenuState = useSideMenuState()
    const [isSideMenuOpen, setSideMenuOpen] = sideMenuState
    return (
        <div>
            <Header setSearchInput={setSearchInput} setSideMenuOpen={setSideMenuOpen} />
            <SideMenu state={sideMenuState} />

            <Routes>
                <Route index element={<SearchScene items={items} />} />
                <Route path="/items/new" element={<NewItemScene />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default MainPage
