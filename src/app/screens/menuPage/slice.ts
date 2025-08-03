import { createSlice } from "@reduxjs/toolkit"
import { MenuPageState } from "../../../lib/types/screen"

const initialState: MenuPageState = {
  chosenProduct: null,
  products: [],
}

const menuPageSlice = createSlice({
  name: "menuPage",
  initialState,
  reducers: {
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload
    },
    setProducts: (state, action) => {
      state.products = action.payload
    },
  },
})

export const { setChosenProduct, setProducts } = menuPageSlice.actions

const MenuPageReducer = menuPageSlice.reducer
export default MenuPageReducer
