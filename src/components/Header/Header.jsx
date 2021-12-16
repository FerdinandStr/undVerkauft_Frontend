import { Button, TextField } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"
import styles from "./style.module.css"

function Header(params) {
    const { setSearchInput, setSideMenuOpen } = params

    const userName = localStorage.getItem("username")

    return (
        <div className={styles.HeaderDiv}>
            <Button onClick={() => setSideMenuOpen(true)}>{"left"}</Button>
            <div>Logo</div>
            <div>
                <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    // value={searchInput}
                    onChange={(e) => setSearchInput(event.target.value)}
                />
            </div>
            {userName ? (
                <p>{userName}</p>
            ) : (
                <Link to="/login">
                    <div>Login</div>
                </Link>
            )}
        </div>
    )
}
export default Header
