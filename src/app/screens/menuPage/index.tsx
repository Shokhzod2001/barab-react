import { Routes, Route } from "react-router-dom"
import "../../../css/menu.css"
import RestaurantMenu from "./Menu"
import ChosenProduct from "./ChosenProduct"

export default function MenuPage() {
  return (
    <div className="products-page">
      <Routes>
        <Route path=":productId" element={<ChosenProduct />} />
        <Route index element={<RestaurantMenu />} />
      </Routes>
    </div>
  )
}
