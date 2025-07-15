import { Box, Container, Stack } from "@mui/material"

export function Footer() {
  return (
    <Stack className="footer">
      <Container className="container">
        <Stack className="info">
          <h1>Let’s Talk With Us</h1>
          <img src="img/Vector.svg" alt="" />
          <img src="img/footer_pizza.png" alt="" className="pizza" />
        </Stack>
        <Stack className="contact-wrapper">
          <Box className="contact">
            <h3>Contact Info</h3>
            <img src="img/contact.svg" alt="" />
            <p>Phone: +010 4390 2001 +998 90 030 70 58</p>
            <p>Email: info@barab.com</p>
          </Box>
          <Box className="contact">
            <h3>Quick Links</h3>
            <img src="img/contact.svg" alt="" />
            <div className="links">
              <a href="/" style={{ marginLeft: "25px" }}>
                HOME
              </a>
              <span style={{ margin: "0 10px", color: "white" }}>-</span>
              <a href="/menu">MENU</a>{" "}
              <span style={{ margin: "0 10px", color: "white" }}>-</span>
              <a href="/about">ABOUT</a>{" "}
              <span style={{ margin: "0 10px", color: "white" }}>-</span>
              <a href="/shop">SHOP</a> <br />
              <a href="/chef" style={{ marginLeft: "65px" }}>
                CHEF
              </a>
              <span style={{ margin: "0 10px", color: "white" }}>-</span>
              <a href="/help">HELP</a>
              <span style={{ margin: "0 10px", color: "white" }}>-</span>
              <a href="/member-page">MYPAGE</a>
            </div>
          </Box>
          <Box className="contact">
            <h3>Favorite Menus</h3>
            <img src="img/contact.svg" alt="" />
            <div className="menu-links">
              <span>BURGERS</span> <span>CHICKEN</span> <span>PIZZA</span>{" "}
              <span>MEXICAN</span>{" "}
              <span style={{ marginLeft: "25px" }}>SALADS</span>{" "}
              <span>DESSERTS</span> <span>BEVERAGES</span>{" "}
              <span style={{ marginLeft: "95px" }}>SANDWICHES</span>
            </div>
          </Box>
        </Stack>
        <Stack className="summary">
          <Box className="left">Copyright 2025 Barab. All Rights Reserved.</Box>
          <Box className="middle">
            <img src="img/bottom_logo.jpg" alt="" />
          </Box>
          <Box className="right">
            <img src="img/visa-card.png" alt="" />
            <img src="img/master-card.png" alt="" />
            <img src="img/express-card.png" alt="" />
            <img src="img/discover-card.png" alt="" />
          </Box>
        </Stack>
      </Container>
      <Stack className="bottom"></Stack>
    </Stack>
  )
}
