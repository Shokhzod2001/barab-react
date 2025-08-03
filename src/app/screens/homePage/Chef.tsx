import { Box, Container, Stack } from "@mui/material"

import { useSelector } from "react-redux"
import { createSelector } from "reselect"
import { retrieveTopChefs } from "./selector"
import { serverApi } from "../../../lib/config"
import { Member } from "../../../lib/types/member"

// REDUX SELECTOR
const TopChefsRetriever = createSelector(retrieveTopChefs, chefs => ({
  chefs,
}))

export default function Chef() {
  const { chefs } = useSelector(TopChefsRetriever)

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
            chefs.map((chef: Member) => {
              const imagePath = `${serverApi}/${chef.memberImage}`
              return (
                <Box key={chef._id} className="chefCard">
                  <img src={imagePath} alt="" />
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
                    <h4>{chef.memberNick}</h4>
                    <p>{chef.memberDesc}</p>
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
