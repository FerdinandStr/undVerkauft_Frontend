import axios from "axios"

axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.withCredentials = true

function getReq(url, data, opt) {
    const getConfig = { method: "get", url, data, ...opt }
    return axios(getConfig)
}

function postReq(url, data, opt) {
    const config = { method: "post", url, data, ...opt }
    console.log(config)
    return axios(config)
}

function patchReq() {}

export { getReq, postReq, patchReq }
