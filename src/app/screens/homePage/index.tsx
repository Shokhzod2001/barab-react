import Advertisement from "./Advertisement"
import Chef from "./Chef"
import Events from "./Events"
import FoodCategory from "./FoodCategory"
import Invitation from "./Invitation"
import PopularDishes from "./PopularDishes"
import "../../../css/home.css"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { useEffect } from "react"

// REDUX SLICE & SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setChefs: (data: Member[]) => dispatch(setChefs(data)),
})

export default function HomePage() {
  const { setPopularDishes, setChefs } = actionDispatch(useDispatch())

  useEffect(() => {
    // Backend server data fetch = Data
    const product = new ProductService()
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCollection: ProductCollection.DISH,
      })
      .then(data => {
        setPopularDishes(data)
      })
      .catch(err => console.log(err))

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
      })
      .then(data => {
        setNewDishes(data)
      })
      .catch(err => console.log(err))

    const member = new MemberService()
    member
      .getTopUsers()
      .then(data => {
        setChefs(data)
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <div className="homepage">
      <FoodCategory />
      <Invitation />
      <PopularDishes />
      <Chef />
      <Advertisement />
      <Events />
    </div>
  )
}
