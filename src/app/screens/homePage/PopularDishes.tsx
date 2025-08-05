import { Box, Container, Stack } from "@mui/material"

import { useSelector } from "react-redux"
import { createSelector } from "reselect"
import { useNavigate } from "react-router-dom"
import { retrievePopularDishes } from "./selector"
import { Product } from "../../../lib/types/product"
import { serverApi } from "../../../lib/config"

// REDUX SELECTOR
const PopularDishesRetriever = createSelector(
  retrievePopularDishes,
  popularDishes => ({ popularDishes }),
)

export default function PopularDishes() {
  const { popularDishes } = useSelector(PopularDishesRetriever)
  const navigate = useNavigate()

  const chooseDishHandler = (id: string) => {
    navigate(`/menu/${id}`)
  }
  return (
    <div className="popularDishes">
      <Container className="container">
        <p>Our Fast Foods</p>
        <h3>
          Our Delicious Fast <span>Foods</span>
        </h3>
        <Stack className="card-wrapper">
          {popularDishes.length === 0 ? (
            <Box className={"empty-list"}>Food Category Empty</Box>
          ) : (
            popularDishes.map((ele: Product) => {
              const imagePath = `${serverApi}/${ele.productImages[0]}`
              return (
                <Stack
                  className="card"
                  key={ele._id}
                  onClick={() => chooseDishHandler(ele._id)}
                >
                  <img src={imagePath} alt="" className="popularImg" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="300"
                    height="300"
                    viewBox="0 0 362 362"
                    fill="none"
                  >
                    <path
                      d="M15.5528 28.3166C-4.32745 130.923 -5.87461 246.425 15.1249 334.938C16.8695 342.292 22.8042 347.865 30.2332 349.254C149.915 371.619 272.482 359.897 330.253 349.244C337.606 347.888 343.418 342.347 345.202 335.087C375.004 213.802 358.832 91.6284 344.93 27.6787C343.309 20.2243 337.448 14.445 329.968 12.9454C216.524 -9.79847 91.4505 2.15137 30.9078 13.0578C23.1051 14.4634 17.0609 20.533 15.5528 28.3166Z"
                      fill="white"
                    />
                  </svg>
                  <Box className="cart">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM17 17H9.29395C8.83288 17 8.60193 17 8.41211 16.918C8.24466 16.8456 8.09938 16.7291 7.99354 16.5805C7.8749 16.414 7.82719 16.1913 7.73274 15.7505L5.27148 4.26465C5.17484 3.81363 5.12587 3.58838 5.00586 3.41992C4.90002 3.27135 4.75477 3.15441 4.58732 3.08205C4.39746 3 4.16779 3 3.70653 3H3M6 6H18.8732C19.595 6 19.9555 6 20.1978 6.15036C20.41 6.28206 20.5653 6.48862 20.633 6.729C20.7104 7.00343 20.611 7.34996 20.411 8.04346L19.0264 12.8435C18.9068 13.2581 18.8469 13.465 18.7256 13.6189C18.6185 13.7547 18.4772 13.861 18.317 13.9263C18.1361 14 17.9211 14 17.4921 14H7.73047M8 21C6.89543 21 6 20.1046 6 19C6 17.8954 6.89543 17 8 17C9.10457 17 10 17.8954 10 19C10 20.1046 9.10457 21 8 21Z"
                        stroke="#121212"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Box>
                  <Box className="like">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 7.69431C10 2.99988 3 3.49988 3 9.49991C3 15.4999 12 20.5001 12 20.5001C12 20.5001 21 15.4999 21 9.49991C21 3.49988 14 2.99988 12 7.69431Z"
                        stroke="#3F9065"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Box>
                  <Box className="price">{ele.productPrice} $</Box>
                  <Box className="info">
                    <p className="title">{ele.productName}</p>
                    <span className="desc">{ele.productDesc}</span>
                  </Box>
                </Stack>
              )
            })
          )}
        </Stack>
      </Container>
    </div>
  )
}
