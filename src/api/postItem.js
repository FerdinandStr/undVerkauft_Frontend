import { postReq } from "../helpers/rest"

export default function postItem(data) {
    return postReq("/items", data)
}
