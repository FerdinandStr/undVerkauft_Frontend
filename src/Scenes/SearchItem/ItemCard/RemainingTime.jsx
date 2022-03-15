import styles from "./ItemCard.module.css"

export default function RemainingTime({ endDate }) {
    const remainingUnixTime = Date.now() - new Date(endDate)
    const absoluteRemTime = Math.abs(remainingUnixTime)

    const auctionText = remainingUnixTime > 0 ? "Abgelaufen seit " : "Noch "
    const stlye = remainingUnixTime > 0 ? styles.PassedTime : remainingUnixTime < -1000 * 60 * 15 ? styles.RemainingTime : styles.RedTime

    const day = 1000 * 60 * 60 * 24
    const hour = 1000 * 60 * 60
    const second = 1000 * 60

    if (Math.abs(absoluteRemTime) > day) {
        const days = Math.trunc(absoluteRemTime / day)
        const hours = Math.trunc((absoluteRemTime % day) / (1000 * 60 * 60))

        return <div className={stlye}>{auctionText + days + " T " + hours + "Std"}</div>
    } else if (Math.abs(remainingUnixTime) > hour) {
        const hours = Math.trunc(absoluteRemTime / hour)
        const minutes = Math.trunc((absoluteRemTime % hour) / (1000 * 60))

        return <div className={stlye}>{auctionText + hours + " Std " + minutes + " Min"}</div>
    } else {
        const minutes = Math.trunc(absoluteRemTime / second)
        const seconds = Math.trunc((absoluteRemTime % second) / 1000) + 1

        return <div className={stlye}>{auctionText + minutes + " Min " + seconds + " Sek"}</div>
    }
}
