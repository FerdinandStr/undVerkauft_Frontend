import { postItem } from "../../api/itemRoutes"

export default function createNewItem(item) {
    console.log("RUN FOR ITEM", item)

    return postItem(item)
        .then((dbItem) => {
            console.log("created Item!", dbItem)
            return dbItem
        })
        .catch((e) => {
            if (e.messages) {
                return e.messages[0]
            } else {
                return e.error
            }
        })
}
