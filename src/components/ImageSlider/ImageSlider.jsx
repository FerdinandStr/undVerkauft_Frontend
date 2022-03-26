import React, { useState } from "react"
import { Link } from "react-router-dom"
import styles from "./ImageSlider.module.css"

export default function ImageSlider(props) {
    const { imgUrlArray, itemId } = props
    const [activeImg, setActiveImg] = useState(0)

    function changeImgLeft() {
        setActiveImg(activeImg - 1 < 0 ? imgUrlArray.length - 1 : activeImg - 1)
    }
    function changeImgRight() {
        setActiveImg(activeImg + 1 == imgUrlArray.length ? 0 : activeImg + 1)
    }

    return imgUrlArray ? (
        <div className={styles.ImageSliderContainer}>
            <button className={"DefaultButton " + styles.LeftButton} onClick={changeImgLeft}>
                {"<<"}
            </button>
            {itemId ? (
                <Link to={"/items/" + itemId}>
                    <img className={styles.Image} src={imgUrlArray[activeImg]} />
                </Link>
            ) : (
                <Link to={"/items/" + itemId}>
                    <img className={styles.Image} src={imgUrlArray[activeImg]} />
                </Link>
            )}
            <button className={"DefaultButton " + styles.RightButton} onClick={changeImgRight}>
                {">>"}
            </button>
        </div>
    ) : null
}
