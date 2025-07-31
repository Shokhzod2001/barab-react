import React from "react"
import { Stack, Box } from "@mui/material"
import Button from "@mui/material/Button"
import TabPanel from "@mui/lab/TabPanel"
import moment from "moment"

export default function ProcessOrders() {
  return (
    <TabPanel value="2">
      <Stack>
        {[1, 2].map((ele, index) => {
          return (
            <Box key={index} className="order-process-box">
              <Box className="order-box-scroll">
                {[1, 2, 3].map((ele2, index2) => {
                  return (
                    <Box key={index2} className="orders-name-price">
                      <img
                        src="/img/lavash.webp"
                        alt="lavash picture"
                        className="order-dish-image"
                      />
                      <p className="title-dish">Lavash</p>
                      <Box className="price-box">
                        <p>$9</p>
                        <img src="/icons/close.svg" alt="CloseIcon" />
                        <p style={{ paddingLeft: "10px" }}>2</p>
                        <img src="/icons/pause.svg" alt="pauseIcon" />
                        <p style={{ marginLeft: "15px" }}>$18</p>
                      </Box>
                    </Box>
                  )
                })}
              </Box>
              <Stack className="order-box-final">
                <p className="final-words">Product price</p>
                <p className="final-numbers">$60</p>
                <img src="/icons/plus.svg" alt="PlusIcon" />
                <p className="final-words">Delivery cost</p>
                <p className="final-numbers">$5</p>
                <img src="/icons/pause.svg" alt="pauseIcon" />
                <p className="final-words">Total</p>
                <p className="final-numbers">$65</p>
                <p className="data-compl">
                  {moment().format("YY-MM-DD HH:mm")}
                </p>

                <Button className="verify-btn" variant="contained">
                  VERIFY TO FULFIL
                </Button>
              </Stack>
            </Box>
          )
        })}

        {false && (
          <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
            <img
              src="/icons/noimage-list.svg"
              alt="No Image"
              style={{ width: 300, height: 300 }}
            />
          </Box>
        )}
      </Stack>
    </TabPanel>
  )
}
