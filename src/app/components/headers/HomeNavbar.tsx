import { Box, Button, Container, Stack } from "@mui/material"
import { NavLink } from "react-router-dom"
import Basket from "./Basket"

export default function HomeNavbar() {
  const authMember = null
  return (
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
                to="/menu"
                className={({ isActive }) =>
                  isActive ? "hover-line underline" : "hover-line"
                }
              >
                MENU
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
            <Basket />
            {!authMember ? (
              <Box className="loginBtn">
                <Button>Login</Button>
                <img src="icons/Button.svg" alt="" />
              </Box>
            ) : (
              <img
                src="icons/default-user.svg"
                alt=""
                style={{ width: "50px", height: "50px", borderRadius: "24px" }}
                aria-haspopup="true"
              />
            )}
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
                <button className="order_btn">
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
  )
}
