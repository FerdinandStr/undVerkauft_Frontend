import { postReq } from "../helpers/rest"

export default function userLogin(login, password) {
    return postReq("/users/login", { login, password })
}
