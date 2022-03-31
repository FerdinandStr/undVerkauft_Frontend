import { Button, TextField } from "@mui/material"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { userLogout } from "../../api/authRoutes"
import styles from "./Header.module.css"
import { useNavigate } from "react-router"

function Header(props) {
    const { useLogin, setSideMenuOpen, filterState } = props
    const navigate = useNavigate()

    const [loginUser, checkLogin] = useLogin

    function logout() {
        userLogout().finally(() => {
            checkLogin()
        })
        navigate("/login")
    }

    const [search, setSearch] = useState("")
    function updateSearch() {
        filterState.addSearchFilter(search.toLocaleLowerCase())
    }

    return (
        <div className={styles.HeaderDiv}>
            <Button onClick={() => setSideMenuOpen(true)}>{"Menü"}</Button>
            <Link to="/items">
                <img className={styles.Logo} src="/und_verkauft_logo.svg" />
            </Link>
            <div>
                <TextField
                    id="outlined-basic"
                    label="Suche"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            updateSearch()
                        }
                    }}
                />
                <Link to="/items">
                    <button className={"DefaultButton"} onClick={updateSearch}>
                        Suchen
                    </button>
                </Link>
            </div>
            {loginUser ? (
                <>
                    <p>{loginUser.username}</p>
                    <Button onClick={logout}>Logout</Button>
                </>
            ) : (
                <Link to="/login">
                    <div>Login</div>
                </Link>
            )}
        </div>
    )
}
export default Header
