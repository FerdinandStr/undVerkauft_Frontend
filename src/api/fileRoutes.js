import { getReq, postReq } from "../helpers/rest"

function getItemImg(filename) {
    return getReq("/files/itemImg/" + filename)
}

function postItemImg(itemId, files) {
    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
        //fuck you FileList
        formData.append("itemImg", files[i])
    }

    const config = { headers: { "content-type": "multipart/form-data" } }

    return postReq("/files/itemImg/" + itemId, formData, { config })
}

export { getItemImg, postItemImg }
