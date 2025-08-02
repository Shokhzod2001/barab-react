import { createSlice } from "@reduxjs/toolkit"
import { HomePageState } from "../../../lib/types/screen"

const initialState: HomePageState = {
  popularDishes: [],
  chefs: [],
}

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setPopularDishes: (state, action) => {
      state.popularDishes = action.payload
    },
    setChefs: (state, action) => {
      state.chefs = action.payload
    },
  },
})

export const { setPopularDishes, setChefs } = homePageSlice.actions

const HomePageReducer = homePageSlice.reducer
export default HomePageReducer
