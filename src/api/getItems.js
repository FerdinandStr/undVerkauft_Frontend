import { getReq } from "../helpers/rest"

export default function getItems(queryParams) {
    return getReq("/items", null, { params: queryParams })
}
