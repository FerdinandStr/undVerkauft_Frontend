import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { postReq } from "../helpers/rest"

function useLoginStatus(username, userId) {
    const navigate = useNavigate()
    const [loginUser, setLoginUser] = useState({ username, userId })

    function checkLogin() {
        postReq("/users/checkLogin")
            .then((data) => {
                setLoginUser({ username: data.username, userId: data._id })
            })
            .catch((e) => {
                console.log("ERROR", e)
                setLoginUser(null)
                navigate("../login", { replace: true })
            })
    }

    useEffect(() => {
        checkLogin()
    }, [])

    return [loginUser, checkLogin]
}

export default useLoginStatus
