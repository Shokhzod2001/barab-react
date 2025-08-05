import { createSlice } from "@reduxjs/toolkit"
import { HomePageState } from "../../../lib/types/screen"

const initialState: HomePageState = {
  popularDishes: [],
  chefs: [],
  products: [],
}

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setPopularDishes: (state, action) => {
      state.popularDishes = action.payload
    },
    setTopChefs: (state, action) => {
      state.chefs = action.payload
    },
    setProducts: (state, action) => {
      state.products = action.payload
    },
  },
})

export const { setPopularDishes, setTopChefs, setProducts } =
  homePageSlice.actions

const HomePageReducer = homePageSlice.reducer
export default HomePageReducer
