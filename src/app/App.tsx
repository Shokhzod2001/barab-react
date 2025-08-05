import { Routes, Route, useLocation } from "react-router-dom"
import HomePage from "./screens/homePage"
import AboutPage from "./screens/aboutPage"
import UserPage from "./screens/userPage"
import MenuPage from "./screens/menuPage"
import ShopPage from "./screens/shopPage"
import ChefPage from "./screens/chefPage"
import HelpPage from "./screens/helpPage"
import HomeNavbar from "./components/headers/HomeNavbar"
import OtherNavbar from "./components/headers/OtherNavbar"
import Footer from "./components/footer"
import "../css/app.css"
import "../css/navbar.css"
import "../css/footer.css"
import { CartItem } from "../lib/types/search"
import { useState } from "react"

export const App = () => {
  const location = useLocation()

  const cartJson: string | null = localStorage.getItem("cartData")
  const currentCart = cartJson ? JSON.parse(cartJson) : []
  const [cartItems, setCartItems] = useState<CartItem[]>(currentCart)

  // HANDLERS
  const onAdd = (input: CartItem) => {
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === input._id,
    )
    if (exist) {
      const cartUpdate = cartItems.map((item: CartItem) => {
        return item._id === input._id
          ? { ...exist, quantity: exist.quantity + 1 }
          : item
      })
      setCartItems(cartUpdate)
      localStorage.setItem("cartData", JSON.stringify(cartUpdate))
    } else {
      const cartUpdate = [...cartItems, { ...input }]
      setCartItems(cartUpdate)
      localStorage.setItem("cartData", JSON.stringify(cartUpdate))
    }
  }

  return (
    <>
      {location.pathname === "/" ? (
        <HomeNavbar cartItems={cartItems} />
      ) : (
        <OtherNavbar cartItems={cartItems} />
      )}
      <Routes>
        <Route path="/" element={<HomePage onAdd={onAdd} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menu/*" element={<MenuPage onAdd={onAdd} />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/chef" element={<ChefPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/member-page" element={<UserPage />} />
      </Routes>
      <Footer />
    </>
  )
}
