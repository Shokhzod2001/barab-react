import { Box, Stack } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { fastFoodEvents } from "../../../lib/data/plans"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/autoplay"
import { useState } from "react"

export default function Events() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <Box className={"eventsFrame"}>
      <Stack className={"eventsMain"}>
        <Box className={"headerContainer"}>
          <p className={"subtitle"}>News & Blogs</p>
          <span className={"categoryTitle"}>
            Our Latest News & <span>Blogs</span>
          </span>
        </Box>
        <img
          src="/icons/greenDec.png"
          alt=""
          className={"float"}
          style={{ marginTop: "30px" }}
        />

        <Swiper
          className={"swiperWrapper"}
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={30}
          navigation={{
            nextEl: `.${"swiperButtonNext"}`,
            prevEl: `.${"swiperButtonPrev"}`,
          }}
          pagination={{
            el: `.${"dotFramePagination"}`,
            clickable: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
          loop={true}
        >
          {fastFoodEvents.map((value, number) => (
            <SwiperSlide key={number} className={"eventsInfoFrame"}>
              <Box>
                <Box className={"eventsImgContainer"}>
                  <img
                    src={value.img}
                    className={"eventsImg"}
                    alt={value.title}
                    style={{
                      transform:
                        activeIndex === number ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                  <Box className={"hotDealBadge"}>Hot Deal!</Box>
                </Box>

                <Box className={"eventsDesc"}>
                  <Box className={"eventsBott"}>
                    <Box className={"bottLeft"}>
                      <Box component="strong" className={"eventTitle"}>
                        {value.title}
                      </Box>
                      <Box className={"eventOrganizator"}>
                        <img
                          src="/icons/speaker.svg"
                          alt="Speaker"
                          className={"speakerIcon"}
                        />
                        <Box component="p" className={"specTextAuthor"}>
                          {value.author}
                        </Box>
                      </Box>
                      <Box component="p" className={"textDesc"}>
                        {value.desc}
                      </Box>
                      <Box className={"bottInfo"}>
                        <Box className={"bottInfoMain"}>
                          <img
                            src="/icons/calendar.svg"
                            alt="Date"
                            className={"infoIcon"}
                          />
                          {value.date}
                        </Box>
                        <Box className={"bottInfoMain"}>
                          <img
                            src="/icons/location.svg"
                            alt="Location"
                            className={"infoIcon"}
                          />
                          {value.location}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        <Box className={"prevNextFrame"}>
          <div className={"dotFramePagination"}></div>
        </Box>
      </Stack>
    </Box>
  )
}
