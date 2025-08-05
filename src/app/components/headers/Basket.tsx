import React from "react"
import { Box, Button, Stack } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import Badge from "@mui/material/Badge"
import Menu from "@mui/material/Menu"
import CancelIcon from "@mui/icons-material/Cancel"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { useNavigate } from "react-router-dom"
import { CartItem } from "../../../lib/types/search"
import { Messages, serverApi } from "../../../lib/config"
import { sweetErrorHandling } from "../../../lib/sweetAlert"
import OrderService from "../../services/OrderService"
// import { useGlobals } from "../../hooks/useGlobals"

interface BasketProps {
  cartItems: CartItem[]
  onAdd: (item: CartItem) => void
  onRemove: (item: CartItem) => void
  onDelete: (item: CartItem) => void
  onDeleteAll: () => void
}

export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props
  // const { authMember, setOrderBuilder } = useGlobals()
  const navigate = useNavigate()

  const itemPrice: number = cartItems.reduce(
    (a: number, c: CartItem) => a + c.quantity * c.price,
    0,
  )

  const shippingCost: number = itemPrice < 100 ? 5 : 0

  const totalPrice = (itemPrice + shippingCost).toFixed(1)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  /** HANDLERS **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  // const proceedOrderHandler = async () => {
  //   try {
  //     handleClose()
  //     if (!authMember) throw new Error(Messages.error2)

  //     const order = new OrderService()
  //     await order.createOrder(cartItems)

  //     onDeleteAll()
  //     // REFRESH VIA CONTEXT
  //     setOrderBuilder(new Date())
  //     navigate("/orders")
  //   } catch (err) {
  //     console.log(err)
  //     sweetErrorHandling(err).then()
  //   }
  // }

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
              <Stack flexDirection={"row"}>
                <div style={{ fontWeight: 600, fontSize: "16px" }}>
                  My Cart Products:
                </div>
                <DeleteForeverIcon
                  sx={{ ml: "230px", cursor: "pointer" }}
                  color={"primary"}
                  onClick={() => onDeleteAll()}
                />
              </Stack>
            )}
          </Box>

          <Box className={"orders-main-wrapper"}>
            <Box className={"orders-wrapper"}>
              {cartItems.map((item: CartItem) => {
                const imagePath = `${serverApi}/${item.image}`
                return (
                  <Box className={"basket-info-box"} key={item._id}>
                    <div className={"cancel-btn"}>
                      <CancelIcon
                        color={"error"}
                        fontSize="small"
                        onClick={() => onDelete(item)}
                      />
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
                        <button
                          className="remove"
                          onClick={() => onRemove(item)}
                        >
                          -
                        </button>
                        <span style={{ margin: "0 8px" }}>{item.quantity}</span>
                        <button className="add" onClick={() => onAdd(item)}>
                          +
                        </button>
                      </div>
                    </Box>
                  </Box>
                )
              })}
            </Box>
          </Box>
          {cartItems.length !== 0 ? (
            <Box className={"basket-order"}>
              <span className={"price"}>
                Total: ${totalPrice} ({itemPrice} + {shippingCost})
              </span>
              <Button
                // onClick={proceedOrderHandler}
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
          ) : (
            ""
          )}
        </Stack>
      </Menu>
    </Box>
  )
}
