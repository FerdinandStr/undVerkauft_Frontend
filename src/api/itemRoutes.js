import { getReq, postReq } from "../helpers/rest"

function postItem(data) {
    return postReq("/items", data)
}

function getItems(queryParams) {
    return getReq("/items", null, { params: queryParams })
}

function getItemById(itemId) {
    return getReq("/items/" + itemId)
}

function deleteItemById(itemId) {
    return postReq("/items/" + itemId, null, { method: "delete" })
}
export { postItem, getItems, getItemById, deleteItemById }
