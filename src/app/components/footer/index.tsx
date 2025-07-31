import { Box, Container, Stack } from "@mui/material"
import { NavLink } from "react-router-dom"

export default function Footer() {
  return (
    <Stack className="footer">
      <Container className="container">
        <Stack className="info">
          <h1>Let's Talk With Us</h1>
          <img src="/img/Vector.svg" alt="decoration" />{" "}
          {/* Added leading slash */}
          <img src="/img/footer_pizza.png" alt="pizza" className="pizza" />{" "}
          {/* Added leading slash */}
        </Stack>
        <Stack className="contact-wrapper">
          <Box className="contact">
            <h3>Contact Info</h3>
            <img src="/img/contact.svg" alt="contact icon" />{" "}
            {/* Added leading slash */}
            <p>Phone: +010 4390 2001 +998 90 030 70 58</p>
            <p>Email: info@barab.com</p>
          </Box>
          <Box className="contact">
            <h3>Quick Links</h3>
            <img src="/img/contact.svg" alt="links icon" />{" "}
            {/* Added leading slash */}
            <div className="links">
              <NavLink
                to="/"
                style={{
                  marginLeft: "25px",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                HOME
              </NavLink>
              <span style={{ margin: "0 10px", color: "white" }}>-</span>
              <NavLink
                to="/menu"
                style={{ color: "white", textDecoration: "none" }}
              >
                MENU
              </NavLink>
              <span style={{ margin: "0 10px", color: "white" }}>-</span>
              <NavLink
                to="/about"
                style={{ color: "white", textDecoration: "none" }}
              >
                ABOUT
              </NavLink>
              <span style={{ margin: "0 10px", color: "white" }}>-</span>
              <NavLink
                to="/shop"
                style={{ color: "white", textDecoration: "none" }}
              >
                SHOP
              </NavLink>
              <br />
              <NavLink
                to="/chef"
                style={{
                  marginLeft: "65px",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                CHEF
              </NavLink>
              <span style={{ margin: "0 10px", color: "white" }}>-</span>
              <NavLink
                to="/help"
                style={{ color: "white", textDecoration: "none" }}
              >
                HELP
              </NavLink>
              <span style={{ margin: "0 10px", color: "white" }}>-</span>
              <NavLink
                to="/member-page"
                style={{ color: "white", textDecoration: "none" }}
              >
                MYPAGE
              </NavLink>
            </div>
          </Box>
          <Box className="contact">
            <h3>Favorite Menus</h3>
            <img src="/img/contact.svg" alt="menu icon" />{" "}
            {/* Added leading slash */}
            <div className="menu-links">
              <span>BURGERS</span> <span>CHICKEN</span> <span>PIZZA</span>
              <span>MEXICAN</span>
              <span style={{ marginLeft: "25px" }}>SALADS</span>
              <span>DESSERTS</span> <span>BEVERAGES</span>
              <span style={{ marginLeft: "95px" }}>SANDWICHES</span>
            </div>
          </Box>
        </Stack>
        <Stack className="summary">
          <Box className="left">Copyright 2025 Barab. All Rights Reserved.</Box>
          <Box className="middle">
            <img src="/img/bottom_logo.jpg" alt="company logo" />{" "}
            {/* Added leading slash */}
          </Box>
          <Box className="right">
            <img src="/img/visa-card.png" alt="visa" />{" "}
            {/* Added leading slash */}
            <img src="/img/master-card.png" alt="mastercard" />{" "}
            {/* Added leading slash */}
            <img src="/img/express-card.png" alt="american express" />{" "}
            {/* Added leading slash */}
            <img src="/img/discover-card.png" alt="discover" />{" "}
            {/* Added leading slash */}
          </Box>
        </Stack>
      </Container>
      <Stack className="bottom"></Stack>
    </Stack>
  )
}
