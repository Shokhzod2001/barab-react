import {
  Box,
  Button,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material"
import { NavLink, useLocation } from "react-router-dom"
import Basket from "./Basket"
import { CartItem } from "../../../lib/types/search"
import { useGlobals } from "../../hooks/useGlobals"
import { serverApi } from "../../../lib/config"
import { Logout } from "@mui/icons-material"

interface OtherNavbarProps {
  cartItems: CartItem[]
  onAdd: (item: CartItem) => void
  onRemove: (item: CartItem) => void
  onDelete: (item: CartItem) => void
  onDeleteAll: () => void
  setLoginOpen: (isOpen: boolean) => void
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void
  anchorEl: HTMLElement | null
  handleCloseLogout: () => void
  handleLogoutRequest: () => void
}

export default function OtherNavbar(props: OtherNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setLoginOpen,
    handleLogoutClick,
    handleCloseLogout,
    anchorEl,
    handleLogoutRequest,
  } = props
  const { authMember } = useGlobals()

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
                <img src="/icons/Button.svg" alt="Login button" />
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
