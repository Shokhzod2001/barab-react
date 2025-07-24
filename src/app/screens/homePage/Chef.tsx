import { Box, Container, Stack } from "@mui/material"
import { useState } from "react"

export default function Chef() {
  const [chefs, setChefs] = useState<number[]>([1, 2, 3, 4])
  return (
    <div className="chef">
      <Container className="container">
        <p className="subtitle">Our Chefs</p>
        <h3 className="title">
          Meet Our Expert <span>Chef</span>
        </h3>
        <img src="/icons/greenDec.png" alt="" />
        <Stack className="chef-wrapper">
          {chefs.length !== 0 ? (
            chefs.map((chef, index) => {
              return (
                <Box key={index} className="chefCard">
                  <img src="img/chef.jpg" alt="" />
                  <Box className="socialapps">
                    <div>
                      <i className="fa-brands fa-facebook-f"></i>
                    </div>
                    <div>
                      <i className="fa-brands fa-linkedin-in"></i>
                    </div>
                    <div>
                      <a
                        href="https://www.youtube.com/@shahzodabdumalikov1333"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa-brands fa-youtube"></i>
                      </a>
                    </div>
                    <div>
                      <a
                        href="https://www.instagram.com/shahzod.abdumalikov.01/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                    </div>
                  </Box>
                  <Box className="info">
                    <h4>Michel Clark</h4>
                    <p>Expert Chef</p>
                  </Box>
                </Box>
              )
            })
          ) : (
            <Box className="no-data">No Chefs</Box>
          )}
        </Stack>
        <img src="img/taco.webp" alt="" className="taco" />
      </Container>
    </div>
  )
}
