// REACT APP STATE

import { Member } from "./member"
import { Product } from "./product"

export interface AppRootState {
  homePage: HomePageState
  menuPage: MenuPageState
  // ordersPage: OrdersPageState
}

// HOMEPAGE
export interface HomePageState {
  popularDishes: Product[]
  chefs: Member[]
  products: Product[]
}

// PRODUCTS PAGE
export interface MenuPageState {
  chosenProduct: Product | null
  products: Product[]
}

// // ORDERS PAGE
// export interface OrdersPageState {
//   pausedOrders: Order[];
//   processOrders: Order[];
//   finishedOrders: Order[];
// }
