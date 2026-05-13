import type { CartItem } from '../types'

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms))

let cartCount = 0

export async function addToCart(item: CartItem): Promise<{ cartCount: number }> {
  await wait(450)

  if (item.quantity < 1) {
    throw new Error('Quantity must be at least 1')
  }

  cartCount += item.quantity
  return { cartCount }
}
