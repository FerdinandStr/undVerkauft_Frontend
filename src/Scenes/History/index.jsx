import React, { useEffect } from "react"
import ItemSearchScene from "../SearchItem/ItemSearchScene"

export default function History({ useLogin }) {
    const [user] = useLogin
    const userId = user ? user.userId : null

    const createdHistoryFilter = userId
        ? [
              { param: "creationUser", value: userId },
              { param: "desc", value: "createdAt" },
          ]
        : []

    const bidHistoryFilter = userId ? [{ param: "offer.bidList.userId", value: userId }] : []

    return (
        <>
            <h1>Von dir erstellte Artikel</h1>
            <ItemSearchScene filterArray={createdHistoryFilter} />
            <h1>Artikel, auf die du geboten hast</h1>
            <ItemSearchScene filterArray={bidHistoryFilter} />
        </>
    )
}
