import {
  Box,
  Button,
  Container,
  Stack,
  Modal,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material"
import { NavLink, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Basket from "./Basket"
import { CartItem } from "../../../lib/types/search"
import { useGlobals } from "../../hooks/useGlobals"
import { serverApi } from "../../../lib/config"
import { Logout } from "@mui/icons-material"

interface HomeNavbarProps {
  cartItems: CartItem[]
  onAdd: (item: CartItem) => void
  onRemove: (item: CartItem) => void
  onDelete: (item: CartItem) => void
  onDeleteAll: () => void
  setSignupOpen: (isOpen: boolean) => void
  setLoginOpen: (isOpen: boolean) => void
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void
  anchorEl: HTMLElement | null
  handleCloseLogout: () => void
  handleLogoutRequest: () => void
}

export default function HomeNavbar(props: HomeNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setSignupOpen,
    setLoginOpen,
    handleLogoutClick,
    handleCloseLogout,
    anchorEl,
    handleLogoutRequest,
  } = props

  const { authMember } = useGlobals()
  const navigate = useNavigate()

  // Pop-up state management
  const [showPopup, setShowPopup] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds

  // Check sessionStorage on component mount
  useEffect(() => {
    const popupShown = sessionStorage.getItem("popupShown")
    if (!popupShown) {
      const timer = setTimeout(() => {
        setShowPopup(true)
        sessionStorage.setItem("popupShown", "true")
      }, 20000) // 20 seconds

      return () => clearTimeout(timer)
    }
  }, []) // Empty dependency array means this runs only once on mount

  // Countdown timer for the offer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (showPopup && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setShowPopup(false)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [showPopup, timeLeft])

  // Format time display
  const formatTime = (seconds: number): string => {
    // Add type annotation for parameter and return type
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Handle pop-up actions
  const handleClosePopup = () => {
    setShowPopup(false)
  }

  const handleClaimOffer = () => {
    // Navigate to menu page with discount parameter
    navigate("/menu?discount=25")
    setShowPopup(false)
  }

  const handleMaybeNext = () => {
    setShowPopup(false)
  }

  return (
    <>
      <div className="home-header">
        <Stack className="home-navbar">
          <Container className="container">
            <Stack className="logo">
              <NavLink to="/">
                <img src="/icons/file.svg" alt="" />
              </NavLink>
            </Stack>
            <Stack className="link-wrapper">
              <Box className="link">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "hover-line underline" : "hover-line"
                  }
                >
                  HOME
                </NavLink>
              </Box>
              <Box className="link">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "hover-line underline" : "hover-line"
                  }
                >
                  ABOUT
                </NavLink>
              </Box>
              <Box className="link">
                <NavLink
                  to="/menu"
                  className={({ isActive }) =>
                    isActive ? "hover-line underline" : "hover-line"
                  }
                >
                  MENU
                </NavLink>
              </Box>
              {authMember ? (
                <Box className="link">
                  <NavLink
                    to="/shop"
                    className={({ isActive }) =>
                      isActive ? "hover-line underline" : "hover-line"
                    }
                  >
                    SHOP
                  </NavLink>
                </Box>
              ) : null}
              <Box className="link">
                <NavLink
                  to="/chef"
                  className={({ isActive }) =>
                    isActive ? "hover-line underline" : "hover-line"
                  }
                >
                  CHEF
                </NavLink>
              </Box>
              <Box className="link">
                <NavLink
                  to="/help"
                  className={({ isActive }) =>
                    isActive ? "hover-line underline" : "hover-line"
                  }
                >
                  HELP
                </NavLink>
              </Box>
              {authMember ? (
                <Box className="link">
                  <NavLink
                    to="/member-page"
                    className={({ isActive }) =>
                      isActive ? "hover-line underline" : "hover-line"
                    }
                  >
                    MYPAGE
                  </NavLink>
                </Box>
              ) : null}
            </Stack>
            <Stack className="cartandlogin">
              <Basket
                cartItems={cartItems}
                onAdd={onAdd}
                onRemove={onRemove}
                onDelete={onDelete}
                onDeleteAll={onDeleteAll}
              />
              {!authMember ? (
                <Box className="loginBtn">
                  <Button onClick={() => setLoginOpen(true)}>Login</Button>
                  <img src="icons/Button.svg" alt="" />
                </Box>
              ) : (
                <img
                  src={
                    authMember?.memberImage
                      ? `${serverApi}/${authMember?.memberImage}`
                      : "icons/default-user.svg"
                  }
                  alt=""
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "24px",
                  }}
                  aria-haspopup="true"
                  onClick={handleLogoutClick}
                />
              )}

              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={Boolean(anchorEl)}
                onClose={handleCloseLogout}
                onClick={handleCloseLogout}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleLogoutRequest}>
                  <ListItemIcon>
                    <Logout fontSize="small" style={{ color: "blue" }} />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Stack>
          </Container>
        </Stack>
        <Stack className="home-main">
          <Container className="container">
            <Box className="title">Fast Food Restaurant</Box>
            <Box className="desc">
              Delicious Fast food <br />
              For today
            </Box>
            <Stack>
              <Box className="bigShape"></Box>
              <Box className="smallShape"></Box>
              <Box className="backword">Burger</Box>
              <Box className="headerMan">
                <img src="img/headerMan.png" alt="" />
              </Box>
              <Box className="burger-header">
                <img src="img/burger_plate.webp" alt="" />
              </Box>
              <Box className="img-header">
                <img src="img/leaf.webp" alt="" />
              </Box>
              {!authMember ? (
                <Box className="btn-header">
                  <button
                    className="order_btn"
                    onClick={() => setSignupOpen(true)}
                  >
                    Signup
                    <img src="img/sticker.webp" alt="" />
                  </button>
                </Box>
              ) : null}

              <Box className="img-shape">
                <img src="img/Shape.svg" alt="" />
              </Box>
              <Box className="dec-header">
                <img src="img/dec_header.png" alt="" />
              </Box>
            </Stack>
          </Container>
        </Stack>
      </div>

      {/* Timed Pop-up Modal */}
      <Modal
        open={showPopup}
        onClose={handleClosePopup}
        aria-labelledby="special-offer-title"
        aria-describedby="special-offer-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2000,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: { xs: "90%", sm: "500px" },
            maxHeight: "90vh",
            bgcolor: "white",
            borderRadius: "20px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            overflow: "hidden",
            outline: "none",
          }}
        >
          {/* Close Button */}
          <Button
            onClick={handleClosePopup}
            sx={{
              position: "absolute",
              top: 15,
              right: 20,
              minWidth: "35px",
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              bgcolor: "rgba(255, 255, 255, 0.9)",
              color: "#666",
              fontSize: "20px",
              zIndex: 10,
              "&:hover": {
                bgcolor: "white",
                transform: "scale(1.1)",
                color: "#333",
              },
            }}
          >
            ×
          </Button>

          {/* Pop-up Header */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #eb1400, #ff4025)",
              color: "white",
              padding: "2rem",
              textAlign: "center",
              position: "relative",
            }}
          >
            <Typography sx={{ fontSize: "3rem", marginBottom: "1rem" }}>
              🍔
            </Typography>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontFamily: '"Barlow Condensed", sans-serif',
                fontWeight: "bold",
                marginBottom: "0.5rem",
                fontSize: { xs: "1.7rem", sm: "2rem" },
              }}
            >
              HUNGRY RIGHT NOW?
            </Typography>
            <Typography
              sx={{
                fontSize: "1.1rem",
                opacity: 0.9,
                fontFamily: '"Barlow Condensed", sans-serif',
              }}
            >
              We've got the perfect deal for you!
            </Typography>
          </Box>

          {/* Pop-up Body */}
          <Box sx={{ padding: "2rem", textAlign: "center" }}>
            {/* Discount Badge */}
            <Box
              sx={{
                background: "#f1c40f",
                color: "#333",
                padding: { xs: "0.8rem 1.5rem", sm: "1rem 2rem" },
                borderRadius: "50px",
                fontSize: { xs: "2rem", sm: "2.5rem" },
                fontWeight: "bold",
                marginBottom: "1.5rem",
                display: "inline-block",
                transform: "rotate(-5deg)",
                boxShadow: "0 5px 15px rgba(241, 196, 15, 0.4)",
                fontFamily: "Bangers, cursive",
              }}
            >
              25% OFF
            </Box>

            {/* Offer Text */}
            <Typography
              sx={{
                fontSize: "1.2rem",
                color: "#666",
                marginBottom: "1.5rem",
                lineHeight: 1.5,
                fontFamily: '"Barlow Condensed", sans-serif',
              }}
            >
              Get <strong>25% off your entire order</strong> when you order
              online today!
              <br />
              Perfect for your first visit or your next craving.
            </Typography>

            {/* Urgency Text */}
            <Box
              sx={{
                background: "#FFE5E5",
                color: "#eb1400",
                padding: "0.8rem",
                borderRadius: "10px",
                fontWeight: "bold",
                marginBottom: "2rem",
                borderLeft: "4px solid #eb1400",
                fontFamily: '"Barlow Condensed", sans-serif',
              }}
            >
              ⏰ Limited time offer - Order within the next{" "}
              {formatTime(timeLeft)} minutes!
            </Box>

            {/* Action Buttons */}
            <Stack spacing={2}>
              <Button
                onClick={handleClaimOffer}
                variant="contained"
                sx={{
                  bgcolor: "#eb1400",
                  color: "white",
                  padding: "15px 30px",
                  borderRadius: "50px",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  fontFamily: '"Barlow Condensed", sans-serif',
                  textTransform: "uppercase",
                  boxShadow: "0 5px 15px rgba(235, 20, 0, 0.3)",
                  "&:hover": {
                    bgcolor: "#c41200",
                    transform: "translateY(-2px)",
                    boxShadow: "0 7px 20px rgba(235, 20, 0, 0.4)",
                  },
                }}
              >
                🛒 ORDER NOW & SAVE 25%
              </Button>

              <Button
                onClick={handleMaybeNext}
                variant="outlined"
                sx={{
                  color: "#666",
                  borderColor: "#ddd",
                  padding: "15px 30px",
                  borderRadius: "50px",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  fontFamily: '"Barlow Condensed", sans-serif',
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "#f8f9fa",
                    borderColor: "#999",
                  },
                }}
              >
                Maybe Next Time
              </Button>
            </Stack>

            {/* Timer Display */}
            <Box
              sx={{
                background: "#eb1400",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "20px",
                fontWeight: "bold",
                marginTop: "1rem",
                fontSize: "0.9rem",
                display: "inline-block",
                fontFamily: '"Barlow Condensed", sans-serif',
              }}
            >
              Offer expires in: {formatTime(timeLeft)}
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
