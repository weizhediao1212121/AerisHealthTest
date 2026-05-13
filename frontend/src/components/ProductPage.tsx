import { useEffect, useMemo, useState } from 'react'
import { addToCart } from '../api/cartApi'
import { getProduct } from '../api/productApi'
import type { Product, ProductSku, SelectedVariants, VariantName } from '../types'
import { clampQuantity, findSku, formatPrice, trackAddToCart } from '../utils'
import { QuantityControl } from './QuantityControl'
import { VariantSelector } from './VariantSelector'

const initialSelected: SelectedVariants = {
  color: 'Graphite',
  size: '10W',
}

function getInitialSelection(product: Product): SelectedVariants {
  const firstInStock = product.skus.find((sku) => sku.stock > 0) ?? product.skus[0]

  return {
    color: firstInStock.color,
    size: firstInStock.size,
  }
}

function getStockLabel(sku: ProductSku | undefined): string {
  if (!sku) {
    return 'Unavailable'
  }

  if (sku.stock === 0) {
    return 'Out of stock'
  }

  if (sku.stock <= 3) {
    return `Only ${sku.stock} left`
  }

  return 'In stock'
}

export function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null)
  const [selected, setSelected] = useState<SelectedVariants>(initialSelected)
  const [quantity, setQuantity] = useState(1)
  const [cartCount, setCartCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [productError, setProductError] = useState('')
  const [cartError, setCartError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    let isMounted = true

    getProduct('aeris-pod')
      .then((nextProduct) => {
        if (!isMounted) {
          return
        }

        setProduct(nextProduct)
        setSelected(getInitialSelection(nextProduct))
      })
      .catch((error: unknown) => {
        if (!isMounted) {
          return
        }

        setProductError(
          error instanceof Error ? error.message : 'Unable to load product',
        )
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  const selectedSku = useMemo(() => {
    if (!product) {
      return undefined
    }

    return findSku(product.skus, selected)
  }, [product, selected])

  function handleVariantChange(name: VariantName, value: string) {
    const nextSelected = { ...selected, [name]: value }
    const nextSku = product ? findSku(product.skus, nextSelected) : undefined

    setSelected(nextSelected)

    if (nextSku) {
      setQuantity((currentQuantity) =>
        clampQuantity(currentQuantity, nextSku.stock),
      )
    }

    setCartError('')
    setSuccessMessage('')
  }

  function handleQuantityChange(nextQuantity: number) {
    if (!selectedSku || Number.isNaN(nextQuantity)) {
      return
    }

    setQuantity(clampQuantity(nextQuantity, selectedSku.stock))
  }

  async function handleAddToCart() {
    if (!product || !selectedSku || selectedSku.stock === 0) {
      return
    }

    setIsAdding(true)
    setCartError('')
    setSuccessMessage('')

    try {
      const result = await addToCart({
        skuId: selectedSku.id,
        quantity,
      })

      setCartCount(result.cartCount)
      setSuccessMessage(`${quantity} item added to cart`)
      trackAddToCart({
        productId: product.id,
        skuId: selectedSku.id,
        quantity,
        price: selectedSku.price,
      })
    } catch (error: unknown) {
      setCartError(
        error instanceof Error ? error.message : 'Unable to add item to cart',
      )
    } finally {
      setIsAdding(false)
    }
  }

  if (isLoading) {
    return (
      <main className="page-shell">
        <section className="state-panel" aria-live="polite">
          Loading product...
        </section>
      </main>
    )
  }

  if (productError || !product) {
    return (
      <main className="page-shell">
        <section className="state-panel error" role="alert">
          {productError || 'Unable to load product'}
        </section>
      </main>
    )
  }

  const isOutOfStock = !selectedSku || selectedSku.stock === 0
  const stockLabel = getStockLabel(selectedSku)

  return (
    <main className="page-shell">
      <header className="top-bar">
        <span className="brand">Aeris Store</span>
        <span className="cart-count">Cart: {cartCount}</span>
      </header>

      <section className="product-layout" aria-label="Product detail">
        <div className="gallery-panel">
          <img
            alt={`${product.name} in ${selected.color}`}
            className="product-image"
            loading="lazy"
            src={selectedSku?.imageUrl}
          />
        </div>

        <div className="details-panel">
          <p className="eyebrow">Wireless charging</p>
          <h1>{product.name}</h1>
          <div className="price-row">
            <span className="price">
              {selectedSku ? formatPrice(selectedSku.price) : 'Unavailable'}
            </span>
            <span className={isOutOfStock ? 'stock out' : 'stock'}>
              {stockLabel}
            </span>
          </div>

          <p className="description">{product.description}</p>

          <VariantSelector
            onChange={handleVariantChange}
            product={product}
            selected={selected}
          />

          <QuantityControl
            disabled={isOutOfStock}
            max={selectedSku?.stock ?? 1}
            onChange={handleQuantityChange}
            quantity={quantity}
          />

          <button
            className="add-button"
            disabled={isOutOfStock || isAdding}
            onClick={handleAddToCart}
            type="button"
          >
            {isAdding ? 'Adding...' : isOutOfStock ? 'Out of stock' : 'Add to Cart'}
          </button>

          <div className="feedback" aria-live="polite">
            {successMessage && <p className="success">{successMessage}</p>}
            {cartError && <p className="error">{cartError}</p>}
          </div>
        </div>
      </section>
    </main>
  )
}
