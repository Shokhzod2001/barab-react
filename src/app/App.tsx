import { Routes, Route, Link } from "react-router-dom"
import { HomePage } from "./screens/homePage"
import { AboutPage } from "./screens/aboutPage/About"
import "../css/app.css"
import { UserPage } from "./screens/userPage"
import { MenuPage } from "./screens/menuPage"
import { ShopPage } from "./screens/shopPage"
import { ChefPage } from "./screens/chefPage"
import { HelpPage } from "./screens/helpPage"
import { ContactPage } from "./screens/contactPage"

export const App = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/menu">MENU</Link>
          </li>
          <li>
            <Link to="/about">ABOUT US</Link>
          </li>
          <li>
            <Link to="/shop">SHOP</Link>
          </li>
          <li>
            <Link to="/chef">OUR CHEF</Link>
          </li>
          <li>
            <Link to="/help">HELP</Link>
          </li>
          <li>
            <Link to="/member-page">MY PAGE</Link>
          </li>
          <li>
            <Link to="/contact">CONTACT</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/chef" element={<ChefPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/member-page" element={<UserPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  )
}
