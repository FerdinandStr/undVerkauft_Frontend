import React from "react"
import { Route, Routes } from "react-router"
import { Link } from "react-router-dom"
import { useFilterState } from "./components/FilterMenuBar"
import Footer from "./components/Footer"
import Header from "./components/Header/Header"
import { SideMenu, useSideMenuState } from "./components/SideMenu/SideMenu"
import { AlertContextProvider } from "./helpers/AlertContext"
import History from "./Scenes/History"
import NewItemScene from "./Scenes/NewItem/NewItemScene"
import MainSearchContainer from "./Scenes/SearchItem"
// import useLoginStatus from "./hooks/useLoginStatus"
// import LoginScene from "./Scenes/LoginScene"
import ItemOverview from "./Scenes/SearchItem/ItemSearchScene"
import ViewItemScene from "./Scenes/ViewItem/ViewItemScene"

function MainPage(props) {
    const { useLogin } = props

    //FilterState for Header Searchbar and MainSearchContainer//
    const filterState = useFilterState()

    //SideMenu State//
    const sideMenuState = useSideMenuState()
    const [isSideMenuOpen, setSideMenuOpen] = sideMenuState

    //Snackbar State => Context is used to send Alerts from Child components via sendAlert() back to MainPage (persitent even after route change)//

    return (
        <div className={"Background"}>
            <Header useLogin={useLogin} setSideMenuOpen={setSideMenuOpen} filterState={filterState} />
            <div className="defaultPageContainer">
                <SideMenu state={sideMenuState} />

                <AlertContextProvider>
                    <Routes>
                        <Route index element={<MainSearchContainer filterState={filterState} />} />
                        <Route path="/items" element={<MainSearchContainer filterState={filterState} />} />
                        <Route path="/items/history" element={<History useLogin={useLogin} />} />
                        <Route path="/items/new" element={<NewItemScene />} />
                        <Route path="/items/update/:itemId" element={<NewItemScene />} />
                        <Route path="/items/:itemId" element={<ViewItemScene useLogin={useLogin} />} />

                        <Route
                            path="*"
                            element={
                                <Link to="/">
                                    <div className="flexBoxCenterColumn">
                                        <img src="/404Image.png" className="Error404Image" />
                                    </div>
                                </Link>
                            }
                        />
                    </Routes>
                </AlertContextProvider>
            </div>
            <Footer />
        </div>
    )
}

export default MainPage
