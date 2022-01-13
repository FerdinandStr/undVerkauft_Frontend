import { getReq, postReq } from "../helpers/rest"

function getItems(queryParams) {
    return getReq("/items", null, { params: queryParams })
}

function getItemById(itemId) {
    return getReq("/items/" + itemId)
}

function postItem(data) {
    return postReq("/items", data)
}

function updateItem(itemId, data) {
    return postReq("/items/" + itemId, data, { method: "patch" })
}

function deleteItemById(itemId) {
    return postReq("/items/" + itemId, null, { method: "delete" })
}
export { getItems, getItemById, postItem, updateItem, deleteItemById }
