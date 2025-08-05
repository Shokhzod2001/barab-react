import { Box, Button, Container, Stack } from "@mui/material"
import { NavLink, useLocation } from "react-router-dom"
import Basket from "./Basket"
import { CartItem } from "../../../lib/types/search"

interface OtherNavbarProps {
  cartItems: CartItem[]
}

export default function OtherNavbar(props: OtherNavbarProps) {
  const { cartItems } = props
  const authMember = null
  const location = useLocation()
  const routeNames: Record<string, string> = {
    "/": "Home",
    "/menu": "MENU",
    "/about": "ABOUT",
    "/shop": "SHOP",
    "/chef": "CHEF",
    "/help": "HELP",
    "/member-page": "MYPAGE",
  }

  // Get base path to handle nested routes
  const getBasePath = (pathname: string) => {
    const segments = pathname.split("/").filter(Boolean)
    return segments.length > 0 ? `/${segments[0]}` : "/"
  }

  const basePath = getBasePath(location.pathname)
  const currentPageName = routeNames[basePath] || "Page"

  return (
    <div className="other-header">
      <Stack className="other-navbar">
        <Container className="container">
          <Stack className="logo">
            <NavLink to="/">
              <img src="/icons/file.svg" alt="Home logo" />
            </NavLink>
          </Stack>
          <Stack className="link-wrapper">
            <Box className="link">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "hover-line underline" : "hover-line"
                }
                end
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
                end
              >
                ABOUT
              </NavLink>
            </Box>
            <Box className="link">
              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  isActive || location.pathname.startsWith("/menu/")
                    ? "hover-line underline"
                    : "hover-line"
                }
              >
                MENU
              </NavLink>
            </Box>
            {authMember && (
              <Box className="link">
                <NavLink
                  to="/shop"
                  className={({ isActive }) =>
                    isActive ? "hover-line underline" : "hover-line"
                  }
                  end
                >
                  SHOP
                </NavLink>
              </Box>
            )}
            <Box className="link">
              <NavLink
                to="/chef"
                className={({ isActive }) =>
                  isActive ? "hover-line underline" : "hover-line"
                }
                end
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
                end
              >
                HELP
              </NavLink>
            </Box>
            {authMember && (
              <Box className="link">
                <NavLink
                  to="/member-page"
                  className={({ isActive }) =>
                    isActive ? "hover-line underline" : "hover-line"
                  }
                  end
                >
                  MYPAGE
                </NavLink>
              </Box>
            )}
          </Stack>
          <Stack className="cartandlogin">
            <Basket cartItems={cartItems} />
            {!authMember ? (
              <Box className="loginBtn">
                <Button>Login</Button>
                <img src="/icons/Button.svg" alt="Login button" />
              </Box>
            ) : (
              <img
                src="/icons/default-user.svg"
                alt="User profile"
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
          <img src="/img/leg.webp" alt="Pizza slice" />
        </Stack>
        <Stack className="dotted">
          <img src="/img/doteBack.png" alt="Dotted background" />
        </Stack>

        <Container className="container">
          <Stack className="otherShape">
            <img src="/img/otherShape.svg" alt="Decorative shape" />
          </Stack>
          <Stack className="info">
            <div className="breadcrumb">
              <h1>{currentPageName}</h1>
              <div className="page-wrapper">
                <NavLink to="/" className="navlink">
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
