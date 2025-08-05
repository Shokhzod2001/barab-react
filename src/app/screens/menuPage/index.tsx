import { Routes, Route } from "react-router-dom"
import "../../../css/menu.css"
import RestaurantMenu from "./Menu"
import ChosenProduct from "./ChosenProduct"
import { CartItem } from "../../../lib/types/search"

interface MenuPageProps {
  onAdd: (item: CartItem) => void
}

export default function MenuPage(props: MenuPageProps) {
  const { onAdd } = props
  return (
    <div className="products-page">
      <Routes>
        <Route path=":productId" element={<ChosenProduct onAdd={onAdd} />} />
        <Route index element={<RestaurantMenu onAdd={onAdd} />} />
      </Routes>
    </div>
  )
}
