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
import { useDispatch } from "react-redux"
import { Dispatch } from "@reduxjs/toolkit"
import { setPopularDishes, setProducts, setTopChefs } from "./slice"
import { Product } from "../../../lib/types/product"
import { Member } from "../../../lib/types/member"
import { useEffect } from "react"
import ProductService from "../../services/ProductService"
import { ProductCategory } from "../../../lib/enums/product.enum"
import MemberService from "../../services/MemberService"
import { CartItem } from "../../../lib/types/search"

// REDUX SLICE & SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setTopChefs: (data: Member[]) => dispatch(setTopChefs(data)),
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
})

interface HomePageProps {
  onAdd: (item: CartItem) => void
}

export default function HomePage(props: HomePageProps) {
  const { onAdd } = props
  const { setPopularDishes, setTopChefs, setProducts } =
    actionDispatch(useDispatch())

  useEffect(() => {
    // Backend server data fetch = Data
    const product = new ProductService()
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCategory: [
          ProductCategory.BURGERS,
          ProductCategory.CHICKEN,
          ProductCategory.PIZZA,
          ProductCategory.SANDWICHES,
          ProductCategory.MEXICAN,
        ],
      })
      .then(data => {
        setPopularDishes(data)
      })
      .catch(err => console.log(err))

    product
      .getProducts({
        page: 1,
        limit: 50,
        order: "createdAt",
      })
      .then(data => {
        setProducts(data)
      })
      .catch(err => console.log(err))

    const member = new MemberService()
    member
      .getTopChefs()
      .then(data => {
        setTopChefs(data)
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <div className="homepage">
      <FoodCategory />
      <Invitation />
      <PopularDishes onAdd={onAdd} />
      <Chef />
      <Advertisement />
      <Events />
    </div>
  )
}
