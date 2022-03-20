import { Alert, Snackbar } from "@mui/material"
import React, { useState } from "react"
import { Navigate, Route, Routes, useNavigate } from "react-router"
import { useFilterState } from "./components/FilterMenuBar"
import Footer from "./components/Footer"
import Header from "./components/Header/Header"
import { SideMenu, useSideMenuState } from "./components/SideMenu/SideMenu"
import { AlertContextProvider } from "./helpers/AlertContext"
import NewItemScene from "./Scenes/NewItem/NewItemScene"
import MainSearchContainer from "./Scenes/SearchItem"
// import useLoginStatus from "./hooks/useLoginStatus"
// import LoginScene from "./Scenes/LoginScene"
import ItemOverview from "./Scenes/SearchItem/ItemSearchScene"
import ViewItemScene from "./Scenes/ViewItem/ViewItemScene"

function MainPage(props) {
    const { useLogin } = props

    //SearchInputState FilterState for Header Searchbar and MainSearchContainer//
    const [searchInput, setSearchInput] = useState()
    const { filterState, addSearchFilter } = useFilterState()

    //SideMenu State//
    const sideMenuState = useSideMenuState()
    const [isSideMenuOpen, setSideMenuOpen] = sideMenuState

    //Snackbar State => Context is used to send Alerts from Child components via sendAlert() back to MainPage (persitent even after route change)//

    return (
        <div>
            <Header useLogin={useLogin} setSearchInput={setSearchInput} setSideMenuOpen={setSideMenuOpen} addSearchFilter={addSearchFilter} />
            <SideMenu state={sideMenuState} />

            <AlertContextProvider>
                <Routes>
                    <Route path="/items" element={<MainSearchContainer searchInput={searchInput} filterState={filterState} />} />
                    <Route path="/items/new" element={<NewItemScene />} />
                    <Route path="/items/update/:itemId" element={<NewItemScene />} />
                    <Route path="/items/:itemId" element={<ViewItemScene useLogin={useLogin} />} />
                </Routes>
            </AlertContextProvider>

            <Footer />
        </div>
    )
}

export default MainPage
