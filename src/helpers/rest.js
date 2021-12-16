import axios from "axios"

axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.withCredentials = true

function getReq(url, data, opt) {
    const config = { method: "get", url, data, ...opt }
    return new Promise((resolve, reject) => {
        axios(config)
            .then((res) => {
                return resolve(res)
            })
            .catch((e) => handleError(e, reject))
    })
}

function postReq(url, data, opt) {
    const config = { method: "post", url, data, ...opt }
    console.log("Config?", config)
    return new Promise((resolve, reject) => {
        axios(config)
            .then((res) => {
                return resolve(res)
            })
            .catch((e) => handleError(e, reject))
    })
}

function handleError(e, reject) {
    // console.log("check", e.message || e)
    if (!e.response) {
        return reject({ error: e.message || e })
    }

    if (e.response.data) {
        const { error, messages, fields } = e.response.data
        return reject({ error: e.response.status + " -> " + error, messages, fields })
    } else {
        return reject({ error: e.response.status + " - " + e.response.statusText })
    }
}

function patchReq() {}

export { getReq, postReq, patchReq }
