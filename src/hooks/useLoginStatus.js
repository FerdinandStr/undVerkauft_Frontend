import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { getReq, postReq } from "../helpers/rest"

function useLoginStatus(username) {
    const navigate = useNavigate()
    const [isLoggedIn, setLoggedIn] = useState(username)

    function checkLogin() {
        postReq("/users/checkLogin")
            .then((res) => {
                localStorage.setItem("username", res.data.username)
                setLoggedIn(res.data.username)
            })
            .catch((e) => {
                console.log("ERROR", e)
                setLoggedIn(null)
                navigate("../login", { replace: true })
            })
    }

    useEffect(() => {
        checkLogin()
    }, [])

    return [isLoggedIn, checkLogin]
}

export default useLoginStatus
