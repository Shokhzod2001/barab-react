import { Routes, Route, useLocation } from "react-router-dom"
import HomePage from "./screens/homePage"
import AboutPage from "./screens/aboutPage/About"
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

export const App = () => {
  const location = useLocation()
  console.log("Current location:", location.pathname)
  return (
    <>
      {location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/chef" element={<ChefPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/member-page" element={<UserPage />} />
      </Routes>
      <Footer />
    </>
  )
}
