import { Box, Container, Stack } from "@mui/material"
import { useState } from "react"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css" // Make sure to import Swiper styles

export interface FoodCategoryType {
  name: string
  image: string
}
export default function FoodCategory() {
  const [foodCategories, setFoodCategories] = useState<FoodCategoryType[]>([
    { name: "Burgers", image: "/img/burgerCategory.png" },
    { name: "Chicken", image: "/img/chickenCategory.png" },
    { name: "Pizza", image: "/img/pizzaCategory.png" },
    { name: "Mexican", image: "/img/mexicanCategory.png" },
    { name: "Salads", image: "/img/saladsCategory.png" },
    { name: "Desserts", image: "/img/dessertsCategory.png" },
    { name: "Beverages", image: "/img/beveragesCategory.png" },
    { name: "Sandwiches", image: "/img/sandwichesCategory.png" },
    { name: "Combo", image: "/img/comboCategory.png" },
  ])

  return (
    <div className="categoryFrame">
      <Container className="container">
        <p className="subTitle">Food Category</p>
        <Box className="title">
          Browse Fast Foods <span className="red_word">Category</span>
        </Box>
        <img src="/icons/greenDec.png" alt="" />

        <Stack className="category-wrapper">
          {foodCategories.length === 0 ? (
            <Box
              className={"empty-list"}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Food Category Empty
            </Box>
          ) : (
            <Box className="cards-wrapper">
              <Box className="switch-btn swiper-category-prev">
                <ArrowBackIosNewIcon />
              </Box>
              <Box className="card-wrapper">
                <Swiper
                  className={"category-swiper"}
                  slidesPerView={"auto"}
                  spaceBetween={25}
                  navigation={{
                    nextEl: ".swiper-category-next",
                    prevEl: ".swiper-category-prev",
                  }}
                  breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                  }}
                >
                  {foodCategories.map((category, index) => (
                    <SwiperSlide key={index} className="top-category-slide">
                      <Stack className={"category-card"}>
                        <Box
                          className={"card-img"}
                          style={{
                            backgroundImage: `url(${category.image})`,
                          }}
                        ></Box>
                        <Box className={"info"}>
                          <strong className={"name"}>{category.name}</strong>
                          <p className={"type"}>26 Items Available</p>
                        </Box>
                      </Stack>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>
              <Box className="switch-btn swiper-category-next">
                <ArrowBackIosNewIcon />
              </Box>
            </Box>
          )}
        </Stack>
      </Container>
    </div>
  )
}
