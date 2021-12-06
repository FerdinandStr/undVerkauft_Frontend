import axios from "axios"
import { useEffect, useState } from "react"
import { print } from "../helpers/fastLog"
import { getReq, postReq } from "../helpers/rest"

function useLoginStatus(userId) {
    const [isLoggedIn, setLoggedIn] = useState(true)

    function checkLogin() {
        postReq("/users/checkLogin")
            .then((res) => {
                localStorage.setItem("username", res.data.username)
                // localStorage.setItem("user_id", res.data.user_id)
                setLoggedIn(true)
            })
            .catch((e) => {
                console.log("ERROR", e)
                setLoggedIn(false)
            })
    }

    useEffect(() => {
        checkLogin()
    }, [])

    return [isLoggedIn, checkLogin]
}

export default useLoginStatus
