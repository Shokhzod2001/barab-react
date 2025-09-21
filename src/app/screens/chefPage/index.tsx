import { Box, Container, Stack, Pagination } from "@mui/material"
import { useEffect, useState } from "react"
import "../../../css/chef.css"
import MenuAdvertisement from "./MenuAdvertisement"
import { createSelector, Dispatch } from "@reduxjs/toolkit"
import { Member } from "../../../lib/types/member"
import { useDispatch, useSelector } from "react-redux"
import MemberService from "../../services/MemberService"
import { setAllChefs } from "./slice"
import { retrieveAllChefs } from "./selector"
import { serverApi } from "../../../lib/config"

// REDUX SLICE & SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
  setAllChefs: (data: Member[]) => dispatch(setAllChefs(data)),
})

// REDUX SELECTOR
const AllChefsRetriever = createSelector(retrieveAllChefs, chefs => ({
  chefs,
}))

export default function ChefPage() {
  const { setAllChefs } = actionDispatch(useDispatch())
  const { chefs } = useSelector(AllChefsRetriever)
  const [currentPage, setCurrentPage] = useState(1)
  const chefsPerPage = 8

  // Calculate current chefs to display
  const indexOfLastChef = currentPage * chefsPerPage
  const indexOfFirstChef = indexOfLastChef - chefsPerPage
  const currentChefs = chefs.slice(indexOfFirstChef, indexOfLastChef)

  // Change page
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value)
  }

  useEffect(() => {
    const member = new MemberService()
    member
      .getAllChefs()
      .then(data => {
        setAllChefs(data)
      })
      .catch(err => console.log(err))
  }, [])

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
            currentChefs.map(chef => {
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
