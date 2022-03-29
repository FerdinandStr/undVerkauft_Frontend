import React from "react"
import styles from "./RemainingTime.module.css"

export default function RemainingTime({ startDate, endDate }) {
    if (!endDate) {
        return <p className={styles.PassedTime}>Auktion noch nicht gestartet</p>
    }

    let remainingUnixTime = Date.now() - new Date(endDate)
    let auctionText = remainingUnixTime > 0 ? "Abgelaufen seit " : "Noch "
    let style = remainingUnixTime > 0 ? styles.PassedTime : remainingUnixTime < -1000 * 60 * 15 ? styles.RemainingTime : styles.RedTime

    //if auction didn't start jet, change endDate calculation with startDate
    if (startDate && new Date(startDate) > new Date()) {
        remainingUnixTime = Date.now() - new Date(startDate)
        auctionText = "Auktion startet in "
        style = styles.NotStartedTime
    }

    const absoluteRemTime = Math.abs(remainingUnixTime)
    const day = 1000 * 60 * 60 * 24
    const hour = 1000 * 60 * 60
    const second = 1000 * 60

    if (Math.abs(absoluteRemTime) > day) {
        const days = Math.trunc(absoluteRemTime / day)
        const hours = Math.trunc((absoluteRemTime % day) / (1000 * 60 * 60))

        return <p className={style}>{auctionText + days + " T " + hours + "Std"}</p>
    } else if (Math.abs(remainingUnixTime) > hour) {
        const hours = Math.trunc(absoluteRemTime / hour)
        const minutes = Math.trunc((absoluteRemTime % hour) / (1000 * 60))

        return <p className={style}>{auctionText + hours + " Std " + minutes + " Min"}</p>
    } else {
        const minutes = Math.trunc(absoluteRemTime / second)
        const seconds = Math.trunc((absoluteRemTime % second) / 1000) + 1

        return <p className={style}>{auctionText + minutes + " Min " + seconds + " Sek"}</p>
    }
}
