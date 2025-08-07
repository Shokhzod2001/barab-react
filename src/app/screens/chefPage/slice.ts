import { createSlice } from "@reduxjs/toolkit"
import { ChefsPageState } from "../../../lib/types/screen"

const initialState: ChefsPageState = {
  chefs: [],
}

const chefsPageSlice = createSlice({
  name: "chefsPage",
  initialState,
  reducers: {
    setAllChefs: (state, action) => {
      state.chefs = action.payload
    },
  },
})

export const { setAllChefs } = chefsPageSlice.actions

const ChefsPageReducer = chefsPageSlice.reducer
export default ChefsPageReducer
