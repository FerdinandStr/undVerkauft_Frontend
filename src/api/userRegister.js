import { postReq } from "../helpers/rest"

export default function userRegister(username, email, password, passwordConfirm) {
    return postReq("/users/register", { username, email, password, passwordConfirm })
}
