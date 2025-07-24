import { Box, Button, Container, Stack } from "@mui/material"

export default function Invitation() {
  return (
    <div className="invitation">
      <Container className="container">
        <Stack className="image"></Stack>
        <Stack className="desc">
          <p>About our restaurant</p>
          <h1>
            We invite you to visit our Fast food <span>restaurant</span>
          </h1>
          <h6>
            At the heart of our kitchen are bold flavors, high-quality
            ingredients, and a commitment to consistency. From juicy burgers,
            crispy fries, and cheesy pizzas to spicy wraps and refreshing
            drinks, every item on our menu is made to order and packed with
            taste.
          </h6>
          <h4>
            Parvez Hossain <br />
            <span>Imon Restaurant owner</span>
          </h4>
          <a href="/about">
            <Box className="visitBtn">
              <Button>VISIT OUR RESTAURANT</Button>
              <img src="icons/Button.svg" alt="" />
            </Box>
          </a>
          <img src="/img/leaves.webp" alt="" className="leaves" />
        </Stack>
      </Container>
    </div>
  )
}
