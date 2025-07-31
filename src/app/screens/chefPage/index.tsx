import { Box, Container, Stack, Pagination } from "@mui/material"
import { useState } from "react"
import "../../../css/chef.css"
import MenuAdvertisement from "./MenuAdvertisement"

export default function ChefPage() {
  const [chefs] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
  const [currentPage, setCurrentPage] = useState(1)
  const chefsPerPage = 8

  // Calculate current chefs to display
  const indexOfLastChef = currentPage * chefsPerPage
  const indexOfFirstChef = indexOfLastChef - chefsPerPage
  const currentChefs = chefs.slice(indexOfFirstChef, indexOfLastChef)

  // Change page
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value)
  }

  return (
    <div className="chefPage">
      <Container className="container">
        <p className="subtitle">Our Chefs</p>
        <h3 className="title">
          Meet Our Expert <span>Chef</span>
        </h3>
        <img src="/icons/greenDec.png" alt="" />
        <Stack className="chef-wrapper">
          {currentChefs.length !== 0 ? (
            currentChefs.map((chef, index) => {
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

        {/* Pagination component */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10, mb: 4 }}>
          <Pagination
            count={Math.ceil(chefs.length / chefsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>

        <MenuAdvertisement />
      </Container>
    </div>
  )
}
