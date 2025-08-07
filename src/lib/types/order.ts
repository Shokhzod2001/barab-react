import { OrderStatus, PaymentStatus } from "../enums/order.enum"
import { Product } from "./product"

export interface OrderItem {
  _id: string
  itemQuantity: number
  itemPrice: number
  productId: string
  orderId: string
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  _id: string
  orderTotal: number
  orderDelivery: number
  orderStatus: OrderStatus
  memberId: string
  createdAt: Date
  updatedAt: Date
  // from aggregations
  orderItems: OrderItem[]
  productData: Product[]
  paymentStatus?: PaymentStatus
  paymentDate?: Date
  cardNumberMasked?: string
}

export interface OrderItemInput {
  itemQuantity: number
  itemPrice: number
  productId: string
  orderId?: string
}

export interface OrderInquiry {
  page: number
  limit: number
  orderstatus: OrderStatus
}

export interface OrderUpdateInput {
  orderId: string
  orderStatus: OrderStatus
  paymentStatus?: PaymentStatus
  paymentDate?: Date
  cardNumberMasked?: string
}
