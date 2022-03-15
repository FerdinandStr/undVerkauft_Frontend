import { getReq, postReq } from "../helpers/rest"

function getItemsByQuery(queryParams) {
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
export { getItemsByQuery, getItemById, postItem, updateItem, deleteItemById }
