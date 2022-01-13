import { Button, TextField } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"
import { userLogout } from "../../api/authRoutes"
import styles from "./style.module.css"
import { useNavigate } from "react-router"

function Header(props) {
    const { useLogin, setSearchInput, setSideMenuOpen } = props
    const navigate = useNavigate()

    const [loginUser, checkLogin] = useLogin

    function logout() {
        userLogout().finally(() => {
            checkLogin()
        })
        navigate("/login")
    }

    return (
        <div className={styles.HeaderDiv}>
            <Button onClick={() => setSideMenuOpen(true)}>{"left"}</Button>
            <Link to="/items">
                <div>Logo</div>
            </Link>
            <div>
                <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    // value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>
            {loginUser ? (
                <div>
                    <p>{loginUser.username}</p>
                    <Button onClick={logout}>Logout</Button>
                </div>
            ) : (
                <Link to="/login">
                    <div>Login</div>
                </Link>
            )}
        </div>
    )
}
export default Header
