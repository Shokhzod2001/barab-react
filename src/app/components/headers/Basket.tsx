import React from "react"
import { Box, Button, Stack } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import Badge from "@mui/material/Badge"
import Menu from "@mui/material/Menu"
import CancelIcon from "@mui/icons-material/Cancel"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { useNavigate } from "react-router-dom"
import { CartItem } from "../../../lib/types/search"
import { serverApi } from "../../../lib/config"

interface BasketProps {
  cartItems: CartItem[]
}

export default function Basket(props: BasketProps) {
  const { cartItems } = props
  const authMember = null
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  // HANDLERS
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box className={"hover-line"} style={{ marginRight: "35px" }}>
      <IconButton
        aria-label="cart"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.05)",
          },
          padding: "17px",
        }}
      >
        <Badge badgeContent={cartItems.length} color="error">
          <img src={"/icons/shopping_cart.svg"} style={{ width: "32px" }} />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            overflow: "visible",
            borderRadius: "12px",
            mt: 1.5,
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
        <Stack className={"basket-frame"}>
          <Box className={"all-check-box"}>
            {cartItems.length === 0 ? (
              <div style={{ fontWeight: 600, fontSize: "16px" }}>
                My Cart is empty
              </div>
            ) : (
              <div style={{ fontWeight: 600, fontSize: "16px" }}>
                My Cart Products:
              </div>
            )}
          </Box>

          <Box className={"orders-main-wrapper"}>
            <Box className={"orders-wrapper"}>
              {cartItems.map((item: CartItem) => {
                const imagePath = `${serverApi}/${item.image}`
                return (
                  <Box className={"basket-info-box"}>
                    <div className={"cancel-btn"}>
                      <CancelIcon color={"error"} fontSize="small" />
                    </div>
                    <img
                      src={imagePath}
                      className={"product-img"}
                      style={{ border: "1px solid #eee" }}
                    />
                    <span className={"product-name"}>{item.name}</span>
                    <p className={"product-price"}>
                      ${item.price} x {item.quantity}
                    </p>
                    <Box sx={{ minWidth: 120 }}>
                      <div className="col-2">
                        <button className="remove">-</button>
                        <span style={{ margin: "0 8px" }}>1</span>
                        <button className="add">+</button>
                      </div>
                    </Box>
                  </Box>
                )
              })}
            </Box>
          </Box>
          <Box className={"basket-order"}>
            <span className={"price"}>Total: $100</span>
            <Button
              startIcon={<ShoppingCartIcon />}
              variant={"contained"}
              sx={{
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#1565c0" },
              }}
            >
              Order Now
            </Button>
          </Box>
        </Stack>
      </Menu>
    </Box>
  )
}
