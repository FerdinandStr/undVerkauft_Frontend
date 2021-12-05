import axios from "axios"
import { useEffect, useState } from "react"
import { print } from "../helpers/fastLog"
import { getReq, postReq } from "../helpers/rest"

function useLoginStatus(userId) {
    const [isLoggedIn, setLoggedIn] = useState(false)

    postReq("/users/login", {
        login: "loginUser",
        password: "password",
    })
        .then((res) => {
            localStorage.setItem("username", res.data.username)
            localStorage.setItem("user_id", res.data.user_id)
            setLoggedIn(true)
        })
        .catch((e) => {
            console.log("ERROR", e)
            setLoggedIn(false)
        })

    useEffect(() => {
        localStorage.getItem("user") ? setLoggedIn(true) : setLoggedIn(false)
    }, [])

    return [isLoggedIn]
}

export default useLoginStatus
