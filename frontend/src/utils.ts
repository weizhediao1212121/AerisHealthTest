import type { ProductSku, SelectedVariants } from './types'

export function findSku(
  skus: ProductSku[],
  selected: SelectedVariants,
): ProductSku | undefined {
  return skus.find(
    (sku) => sku.color === selected.color && sku.size === selected.size,
  )
}

export function clampQuantity(value: number, stock: number): number {
  if (stock <= 0) {
    return 1
  }

  return Math.min(Math.max(value, 1), stock)
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function trackAddToCart(payload: {
  productId: string
  skuId: string
  quantity: number
  price: number
}) {
  console.info('add_to_cart', payload)
}
