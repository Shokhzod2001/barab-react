import { Stack, Box } from "@mui/material"
import Button from "@mui/material/Button"
import TabPanel from "@mui/lab/TabPanel"
import moment from "moment"
import { useSelector } from "react-redux"
import { createSelector } from "reselect"
import { retrieveProcessOrders } from "./selector"
import { Messages, serverApi } from "../../../lib/config"
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order"
import { Product } from "../../../lib/types/product"
import { useGlobals } from "../../hooks/useGlobals"
import { OrderStatus } from "../../../lib/enums/order.enum"
import OrderService from "../../services/OrderService"
import { sweetErrorHandling } from "../../../lib/sweetAlert"
import { T } from "../../../lib/types/common"

// REDUX SELECTOR
const ProcessOrdersRetriever = createSelector(
  retrieveProcessOrders,
  processOrders => ({ processOrders }),
)

interface ProcessOrdersProps {
  setValue: (input: string) => void
}

export default function ProcessOrders(props: ProcessOrdersProps) {
  const { processOrders } = useSelector(ProcessOrdersRetriever)
  const { setValue } = props
  const { authMember, setOrderBuilder } = useGlobals()

  // HANDLERS
  const finishOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2)

      const orderId = e.target.value
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH,
      }

      const confirmation = window.confirm("Have you received your order?")
      if (confirmation) {
        const order = new OrderService()
        await order.updateOrder(input)
        setValue("3")
        setOrderBuilder(new Date())
      }
    } catch (err) {
      console.log(err)
      sweetErrorHandling(err).then()
    }
  }

  return (
    <TabPanel value="2">
      <Stack>
        {processOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className="order-process-box">
              <Box className="order-box-scroll">
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product | undefined = order.productData?.find(
                    (ele: Product) => item.productId === ele._id,
                  )

                  if (!product) {
                    console.warn(`Product not found for item ${item._id}`)
                    return null
                  }

                  const imagePath = product?.productImages?.[0]
                    ? `${serverApi}/${product.productImages[0]}`
                    : "/icons/noimage-list.svg"

                  return (
                    <Box key={item._id} className="orders-name-price">
                      <img
                        src={imagePath}
                        alt={product.productName || "product image"}
                        className="order-dish-image"
                      />
                      <p className="title-dish">{product.productName}</p>
                      <Box className="price-box">
                        <p>${item.itemPrice}</p>
                        <img src="/icons/close.svg" alt="CloseIcon" />
                        <p style={{ paddingLeft: "10px" }}>
                          {item.itemQuantity}
                        </p>
                        <img src="/icons/pause.svg" alt="pauseIcon" />
                        <p style={{ marginLeft: "15px" }}>
                          ${item.itemQuantity * item.itemPrice}
                        </p>
                      </Box>
                    </Box>
                  )
                })}
              </Box>
              <Stack className="order-box-final">
                <p className="final-words">Product price</p>
                <p className="final-numbers">
                  ${order.orderTotal - order.orderDelivery}
                </p>
                <img src="/icons/plus.svg" alt="PlusIcon" />
                <p className="final-words">Delivery cost</p>
                <p className="final-numbers">${order.orderDelivery}</p>
                <img src="/icons/pause.svg" alt="pauseIcon" />
                <p className="final-words">Total</p>
                <p className="final-numbers">${order.orderTotal}</p>
                <p className="data-compl">
                  {moment(order.createdAt).format("YY-MM-DD HH:mm")}
                </p>

                <Button
                  value={order._id}
                  className="verify-btn"
                  variant="contained"
                  onClick={finishOrderHandler}
                >
                  VERIFY TO FULFIL
                </Button>
              </Stack>
            </Box>
          )
        })}

        {(!processOrders || processOrders.length === 0) && (
          <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
            <img
              src="/icons/noimage-list.svg"
              alt="No Orders"
              style={{ width: 300, height: 300 }}
            />
          </Box>
        )}
      </Stack>
    </TabPanel>
  )
}
