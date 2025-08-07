// REACT APP STATE

import { Member } from "./member"
import { Order } from "./order"
import { Product } from "./product"

export interface AppRootState {
  homePage: HomePageState
  menuPage: MenuPageState
  ordersPage: OrdersPageState
  chefsPage: ChefsPageState
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

// ORDERS PAGE
export interface OrdersPageState {
  pausedOrders: Order[]
  processOrders: Order[]
  finishedOrders: Order[]
}

// CHEFS PAGE
export interface ChefsPageState {
  chefs: Member[]
}
