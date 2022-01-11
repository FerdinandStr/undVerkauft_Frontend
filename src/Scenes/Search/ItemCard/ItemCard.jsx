import { Link } from "react-router-dom"
import ImageSlider from "../../../components/ImageSlider/ImageSlider"
import { BASE_URL } from "../../../helpers/rest"
import style from "./ItemCard.module.css"

export default function ItemCard(props) {
    const { item } = props

    const lastBid = item.offer ? item.offer.bidList[item.offer.bidList.length - 1] : null

    const lastPrice = lastBid ? lastBid.bid : null || item.offer.askPrice

    //-----//
    // const [imageUrlArray, setImageUrlArray] = useState()
    const imageUrlArray = item.picList.map((pic) => BASE_URL + "/files/itemImg/" + pic.filename)
    // setImageUrlArray(item.picList.map((pic) => BASE_URL + "/files/itemImg/" + pic.filename))

    return (
        <div className={style.ItemCard}>
            <ImageSlider imgUrlArray={imageUrlArray} />
            <div>
                <Link to={"/items/" + item._id}>
                    <p className={style.ItemName}>{item.name}</p>
                </Link>
                <p className={style.ItemDesc}>{item.description}</p>
                <p className={style.ItemPrice}>{lastPrice} €</p>
            </div>
        </div>
    )
}
