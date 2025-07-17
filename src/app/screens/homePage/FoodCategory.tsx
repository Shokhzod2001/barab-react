import { Box, Container, Stack } from "@mui/material"
import { useState } from "react"

export default function FoodCategory() {
  const [foodCategory, setFoodCategory] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7,
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
          {foodCategory.length === 0 ? (
            <Box className={"empty-list"}>Food Category Empty</Box>
          ) : (
            <Box className="cards-wrapper">
              <Box className="switch-btn swiper-category-prev">
                <ArrowBackIosNewIcon />
              </Box>
              <Box className="card-wrapper">
                <Swiper
                  className={"top-agents-swiper"}
                  slidesPerView={"auto"}
                  spaceBetween={29}
                  navigation={{
                    nextEl: ".swiper-agents-next",
                    prevEl: ".swiper-agents-prev",
                  }}
                  pagination={{
                    el: ".swiper-popular-pagination",
                  }}
                >
                  {topAgents.map((agent, index) => {
                    return (
                      <SwiperSlide key={index} className="top-agents-slide">
                        <TopAgentsCard />
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </Box>
              <Box className="switch-btn swiper-agents-next">
                <ArrowBackIosNewIcon />
              </Box>
            </Box>
          )}
        </Stack>
      </Container>
    </div>
  )
}
