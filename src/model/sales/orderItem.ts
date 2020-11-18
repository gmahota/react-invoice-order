interface OrderItem {
  id: number
  code: string
  description: string
  unity: string
  quantity: number
  price: number
  grossTotal: number
  vatTotal: number
  total: number
  project?: string
  vatCode?: string
}

export default OrderItem