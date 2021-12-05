import { TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import getItems from "../../api/getItems"
import { getReq } from "../../helpers/rest"
import styles from "./style.module.css"

function Header(params) {
    const { setSearchInput } = params
    // const [searchInput, setSearchInput] = useState()

    // useEffect

    return (
        <div className={styles.HeaderDiv}>
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
            <div>Login</div>
        </div>
    )
}
export default Header
