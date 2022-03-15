import { postReq } from "../helpers/rest"

function postNewOfferForItem(offer) {
    return postReq("/items/" + itemId + "/offer", offer)
}

function patchOfferForItem(itemId, bid) {
    return postReq("/items/" + itemId + "/offer/bid", { bid }, { method: "patch" })
}

function postNewBid(itemId, bid) {
    return postReq("/items/" + itemId + "/offer/bid", { bid })
}

export { postNewBid, patchOfferForItem, postNewOfferForItem }
