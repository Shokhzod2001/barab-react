import { Box, Button, Container, Stack } from "@mui/material"
import { NavLink } from "react-router-dom"
import { useLocation } from "react-router-dom"

export function OtherNavbar() {
  const authMember = null
  const location = useLocation()
  const routeNames: any = {
    "/": "Home",
    "/menu": "MENU",
    "/about": "ABOUT",
    "/shop": "SHOP",
    "/chef": "CHEF",
    "/help": "HELP",
    "/member-page": "MYPAGE",
  }
  const currentPageName = routeNames[location.pathname] || "Page"
  return (
    <div className="other-header">
      <Stack className="other-navbar">
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
            {/* BASKET */}
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
      <Stack className="other-main">
        <Stack className="back_image"></Stack>
        <Stack className="pizza_slice">
          <img src="img/leg.webp" alt="" />
        </Stack>
        <Stack className="dotted">
          <img src="img/doteBack.png" alt="" />
        </Stack>

        <Container className="container">
          <Stack className="otherShape">
            <img src="img/otherShape.svg" alt="" />
          </Stack>
          <Stack className="info">
            <div className="breadcrumb">
              <h1>{currentPageName}</h1>
              <div className="page-wrapper">
                <NavLink to="/" className={"navlink"}>
                  Home
                </NavLink>{" "}
                / <p className="page">{currentPageName}</p>
              </div>
            </div>
          </Stack>
        </Container>
      </Stack>
    </div>
  )
}
