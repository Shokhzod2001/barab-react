import { createSelector } from "reselect"
import { AppRootState } from "../../../lib/types/screen"

const selectHomePage = (state: AppRootState) => state.homePage

export const retrievePopularDishes = createSelector(
  selectHomePage,
  HomePage => HomePage.popularDishes,
)

export const retrieveTopChefs = createSelector(
  selectHomePage,
  HomePage => HomePage.chefs,
)

export const retrieveProducts = createSelector(
  selectHomePage,
  HomePage => HomePage.products,
)
