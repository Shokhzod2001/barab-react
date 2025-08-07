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
import { useState } from "react"
import { useGlobals } from "./hooks/useGlobals"
import useBasket from "./hooks/useBasket"
import MemberService from "./services/MemberService"
import { sweetErrorHandling, sweetTopSuccessAlert } from "../lib/sweetAlert"
import { Messages } from "../lib/config"
import "../css/app.css"
import "../css/navbar.css"
import "../css/footer.css"
import AuthenticationModal from "./components/auth"

export const App = () => {
  const location = useLocation()
  console.log("Location:", location)
  const { setAuthMember } = useGlobals()
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket()
  const [signupOpen, setSignupOpen] = useState<boolean>(false)
  const [loginOpen, setLoginOpen] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  // HANDLERS

  const handleSignupClose = () => setSignupOpen(false)
  const handleLoginClose = () => setLoginOpen(false)

  const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleCloseLogout = () => setAnchorEl(null)
  const handleLogoutRequest = async () => {
    try {
      const member = new MemberService()
      await member.logout()
      await sweetTopSuccessAlert("success", 700)
      setAuthMember(null)
    } catch (err) {
      console.log(err)
      sweetErrorHandling(Messages.error1)
    }
  }

  return (
    <>
      {location.pathname === "/" ? (
        <HomeNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
        />
      ) : (
        <OtherNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setLoginOpen={setLoginOpen}
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
        />
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

      <AuthenticationModal
        signupOpen={signupOpen}
        loginOpen={loginOpen}
        handleSignupClose={handleSignupClose}
        handleLoginClose={handleLoginClose}
      />
    </>
  )
}
