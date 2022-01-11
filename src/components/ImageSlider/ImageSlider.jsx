import { useState } from "react"
import styles from "./ImageSlider.module.css"

export default function ImageSlider(props) {
    const { imgUrlArray } = props
    const [activeImg, setActiveImg] = useState(0)

    function changeImgLeft() {
        setActiveImg(activeImg - 1 < 0 ? imgUrlArray.length - 1 : activeImg - 1)
    }
    function changeImgRight() {
        setActiveImg(activeImg + 1 == imgUrlArray.length ? 0 : activeImg + 1)
    }

    return imgUrlArray ? (
        <div className={styles.ImageSliderContainer}>
            <button className={styles.LeftButton + " DefaultButton"} onClick={changeImgLeft}>
                {"<<"}
            </button>
            <img className={styles.Image} src={imgUrlArray[activeImg]}></img>
            <button className={styles.RightButton + " DefaultButton"} onClick={changeImgRight}>
                {">>"}
            </button>
        </div>
    ) : null
}
