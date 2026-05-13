import { product } from '../data/product'
import type { Product } from '../types'

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms))

export async function getProduct(productId: string): Promise<Product> {
  await wait(350)

  if (productId !== product.id) {
    throw new Error('Product not found')
  }

  return product
}
