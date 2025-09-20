import { Stack, Box } from "@mui/material"
import Button from "@mui/material/Button"
import TabPanel from "@mui/lab/TabPanel"
import { useSelector } from "react-redux"
import { createSelector } from "reselect"
import { retrievePausedOrders } from "./selector"
import { Messages, serverApi } from "../../../lib/config"
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order"
import { Product } from "../../../lib/types/product"
import { sweetErrorHandling } from "../../../lib/sweetAlert"
import { OrderStatus, PaymentStatus } from "../../../lib/enums/order.enum"
import { useGlobals } from "../../hooks/useGlobals"
import OrderService from "../../services/OrderService"
import { T } from "../../../lib/types/common"

// REDUX SELECTOR
const PausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  pausedOrders => ({ pausedOrders }),
)

interface PausedOrdersProps {
  setValue: (input: string) => void
}

export default function PausedOrders(props: PausedOrdersProps) {
  const { setValue } = props
  const { authMember, setOrderBuilder } = useGlobals()
  const { pausedOrders } = useSelector(PausedOrdersRetriever)

  // HANDLERS
  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2)
      const orderId = e.target.value
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      }

      const confirmation = window.confirm("Do you want to delete the order?")
      if (confirmation) {
        const order = new OrderService()
        await order.updateOrder(input)
        // Order Rebuild
        setOrderBuilder(new Date())
      }
    } catch (err) {
      console.log(err)
      sweetErrorHandling(err).then()
    }
  }

  const processOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2)

      const orderId = e.target.value
      const confirmation = window.confirm(
        "Your order will be marked as paid. An admin will verify your payment.",
      )

      if (confirmation) {
        const input: OrderUpdateInput = {
          orderId: orderId,
          orderStatus: OrderStatus.PROCESS,
          paymentStatus: PaymentStatus.PENDING, // Mark as pending verification
        }

        const orderService = new OrderService()
        await orderService.updateOrder(input)

        setValue("2")
        setOrderBuilder(new Date())

        alert(
          "Order submitted for payment verification. You'll be notified when approved.",
        )
      }
    } catch (err) {
      console.log(err)
      sweetErrorHandling(err).then()
    }
  }

  // RENDER LOGIC
  if (!pausedOrders || pausedOrders.length === 0) {
    return (
      <TabPanel value="1">
        <Box display="flex" flexDirection="row" justifyContent="center">
          <img
            src="/icons/noimage-list.svg"
            alt="No orders"
            style={{ width: 300, height: 300 }}
          />
        </Box>
      </TabPanel>
    )
  }

  return (
    <TabPanel value="1">
      <Stack>
        {pausedOrders.map((order: Order) => (
          <Box key={order._id} className="order-main-box">
            <Box className="order-box-scroll">
              {order?.orderItems?.map((item: OrderItem) => {
                const product: Product | undefined = order.productData?.find(
                  (ele: Product) => ele?._id === item?.productId,
                )

                if (!product) {
                  console.warn(`Product not found for item ${item?._id}`)
                  return null
                }

                const imagePath = product?.productImages?.[0]
                  ? `${serverApi}/${product.productImages[0]}`
                  : "/icons/noimage-list.svg"

                return (
                  <Box key={item._id} className="orders-name-price">
                    <img
                      src={imagePath}
                      alt={product?.productName || "Product image"}
                      className="order-dish-image"
                    />
                    <p className="title-dish">
                      {product?.productName || "Unknown Product"}
                    </p>
                    <Box className="price-box">
                      <p>${item?.itemPrice || 0}</p>
                      <img src="/icons/close.svg" alt="CloseIcon" />
                      <p style={{ paddingLeft: "10px" }}>
                        {item?.itemQuantity || 0}
                      </p>
                      <img src="/icons/pause.svg" alt="pauseIcon" />
                      <p style={{ marginLeft: "15px" }}>
                        ${(item?.itemQuantity || 0) * (item?.itemPrice || 0)}
                      </p>
                    </Box>
                  </Box>
                )
              })}
            </Box>
            <Stack className="order-box-final">
              <p className="final-words">Product price</p>
              <p className="final-numbers">
                ${(order?.orderTotal || 0) - (order?.orderDelivery || 0)}
              </p>
              <img src="/icons/plus.svg" alt="PlusIcon" />
              <p className="final-words">Delivery cost</p>
              <p className="final-numbers">${order?.orderDelivery || 0}</p>
              <img src="/icons/pause.svg" alt="pauseIcon" />
              <p className="final-words">Total</p>
              <p className="final-numbers">${order?.orderTotal || 0}</p>
              <Button
                value={order._id}
                className="cancel-btn"
                variant="contained"
                onClick={deleteOrderHandler}
              >
                CANCEL
              </Button>
              <Button
                value={order._id}
                className="payment-btn"
                variant="contained"
                onClick={processOrderHandler}
              >
                PAYMENT
              </Button>
            </Stack>
          </Box>
        ))}
      </Stack>
    </TabPanel>
  )
}
