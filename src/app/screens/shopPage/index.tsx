import { useState, SyntheticEvent } from "react"
import { Container, Stack, Box } from "@mui/material"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import Divider from "../../components/divider"
import PausedOrders from "./PausedOrders"
import ProcessOrders from "./ProcessOrders"
import FinishedOrders from "./FinishedOrders"
import "../../../css/shop.css"

export default function OrdersPage() {
  const [value, setValue] = useState("1")

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <div className="order-page">
      <Container className="order-container">
        <Stack className="order-left">
          <TabContext value={value}>
            <Box className="order-nav-frame">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className="table-list"
                >
                  <Tab label="PAUSED ORDERS" value={"1"} />
                  <Tab label="PROCESS ORDERS" value={"2"} />
                  <Tab label="FINISHED ORDERS" value={"3"} />
                </Tabs>
              </Box>
              <Divider width="690" height="2" bg="#E0E0E7" />
            </Box>
            <Stack className="order-main-content">
              <PausedOrders />
              <ProcessOrders />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>
        <Stack className="order-right">
          <Stack className="user-box">
            <img
              src="/img/justin.webp"
              alt="User Image"
              className="user-image"
            />
            <Box className="badge-font">
              <img
                src="/icons/user-badge.svg"
                alt="userBadge"
                className="user-badge"
              />
            </Box>
            <Box className="user-name">Justin</Box>
            <Box className="user-status">USER</Box>
            <Divider width="332" height="2" bg="#A1A1A1" />
            <Stack className="adress-section">
              <LocationOnIcon />
              <Box className="adress">South Korea, Busan</Box>
            </Stack>
          </Stack>
          <Stack className="card-box">
            <input
              type="number"
              className="card-number"
              placeholder="Card number : 5243 4090 2002 7495"
            />
            <Stack className="card-datas">
              <input type="text" placeholder="07 / 24" />
              <input type="text" placeholder="CVV : 010" />
            </Stack>
            <input
              type="text"
              className="card-user-name"
              placeholder="Justin Robertson"
            />
            <Stack className="card-holder">
              <img src="/icons/western-card.svg" alt="" />
              <img src="/icons/master-card.svg" alt="" />
              <img src="/icons/paypal-card.svg" alt="" />
              <img src="/icons/visa-card.svg" alt="" />
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  )
}
