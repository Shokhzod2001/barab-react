import { Box, Container, Stack } from "@mui/material"
import { useState, useEffect, useRef } from "react"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import { createSelector } from "@reduxjs/toolkit"
import { retrieveProducts } from "./selector"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ProductCategory } from "../../../lib/enums/product.enum"

export interface FoodCategoryType {
  name: string
  image: string
  count: number
}

// REDUX SELECTOR
const ProductsRetriever = createSelector(retrieveProducts, products => ({
  products,
}))

const initialCategories = [
  { name: "Burgers", image: "/img/burgerCategory.png" },
  { name: "Chicken", image: "/img/chickenCategory.png" },
  { name: "Pizza", image: "/img/pizzaCategory.png" },
  { name: "Mexican", image: "/img/mexicanCategory.png" },
  { name: "Salads", image: "/img/saladsCategory.png" },
  { name: "Desserts", image: "/img/dessertsCategory.png" },
  { name: "Beverages", image: "/img/beveragesCategory.png" },
  { name: "Sandwiches", image: "/img/sandwichesCategory.png" },
  { name: "Combo", image: "/img/comboCategory.png" },
]

const categoryNameToEnumMap: Record<string, ProductCategory> = {
  Burgers: ProductCategory.BURGERS,
  Chicken: ProductCategory.CHICKEN,
  Pizza: ProductCategory.PIZZA,
  Mexican: ProductCategory.MEXICAN,
  Salads: ProductCategory.SALADS,
  Desserts: ProductCategory.DESSERTS,
  Beverages: ProductCategory.BEVERAGES,
  Sandwiches: ProductCategory.SANDWICHES,
  Combo: ProductCategory.COMBO,
}

export default function FoodCategory() {
  const { products } = useSelector(ProductsRetriever)
  const [foodCategories, setFoodCategories] = useState<FoodCategoryType[]>([])
  const navigate = useNavigate()
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  useEffect(() => {
    const categoriesWithCounts = initialCategories.map(category => {
      const count = products.filter(
        product =>
          product.productCategory?.toLowerCase() ===
          category.name.toLowerCase(),
      ).length
      return { ...category, count }
    })

    setFoodCategories(categoriesWithCounts)
  }, [products])

  const handleCategoryClick = (categoryName: string) => {
    const categoryEnum = categoryNameToEnumMap[categoryName]
    if (categoryEnum) {
      navigate(`/menu?category=${categoryEnum}`)
    }
  }

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
            <Box className={"empty-list"}>Food Category Empty</Box>
          ) : (
            <Box className="cards-wrapper">
              <Box
                className="switch-btn swiper-category-prev"
                ref={prevRef}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: "#3f9065",
                  },
                }}
              >
                <ArrowBackIosNewIcon />
              </Box>

              <Box className="card-wrapper">
                <Swiper
                  modules={[Navigation]}
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                  onInit={swiper => {
                    // @ts-ignore
                    swiper.params.navigation.prevEl = prevRef.current
                    // @ts-ignore
                    swiper.params.navigation.nextEl = nextRef.current
                    swiper.navigation.init()
                    swiper.navigation.update()
                  }}
                  className={"category-swiper"}
                  slidesPerView={"auto"}
                  spaceBetween={25}
                  breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                  }}
                >
                  {foodCategories.map((category, index) => (
                    <SwiperSlide
                      key={index}
                      className="top-category-slide"
                      onClick={() => handleCategoryClick(category.name)}
                    >
                      <Stack className={"category-card"}>
                        <Box
                          className={"card-img"}
                          style={{
                            backgroundImage: `url(${category.image})`,
                          }}
                        ></Box>
                        <Box className={"info"}>
                          <strong className={"name"}>{category.name}</strong>
                          <p className={"type"}>
                            {category.count} Items Available
                          </p>
                        </Box>
                      </Stack>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>

              <Box
                className="switch-btn swiper-category-next"
                ref={nextRef}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: "#3f9065",
                  },
                }}
              >
                <ArrowBackIosNewIcon />
              </Box>
            </Box>
          )}
        </Stack>
      </Container>
    </div>
  )
}
