import { createSelector } from "reselect"
import { AppRootState } from "../../../lib/types/screen"

const selectChefsPage = (state: AppRootState) => state.chefsPage

export const retrieveAllChefs = createSelector(
  selectChefsPage,
  ChefsPage => ChefsPage.chefs,
)
