import { postReq } from "../helpers/rest"

function userRegister(username, email, password, passwordConfirm) {
    return postReq("/users/register", { username, email, password, passwordConfirm })
}

function userLogin(login, password) {
    return postReq("/users/login", { login, password })
}

function userLogout() {
    return postReq("/users/logout").then().catch()
}

export { userRegister, userLogin, userLogout }
