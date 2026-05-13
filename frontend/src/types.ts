export type VariantName = 'color' | 'size'

export type VariantDimension = {
  name: VariantName
  label: string
  values: string[]
}

export type ProductSku = {
  id: string
  color: string
  size: string
  price: number
  stock: number
  imageUrl: string
}

export type Product = {
  id: string
  name: string
  description: string
  variants: VariantDimension[]
  skus: ProductSku[]
}

export type SelectedVariants = Record<VariantName, string>

export type CartItem = {
  skuId: string
  quantity: number
}
