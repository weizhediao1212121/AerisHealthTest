# Frontend PDP

React + TypeScript Product Detail Page for the e-commerce coding test.

## Quick Check

```bash
npm run lint
npm run build
npm run dev
```

Open:

```text
http://127.0.0.1:5174/
```

## Install

Requires Node.js and npm.

```bash
cd frontend
npm install
```

## Run

```bash
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173/
```

## Build

```bash
npm run build
```

## What Is Implemented

- Product image, name, price, stock status, and description
- Color and capacity variant selection
- Price and stock updates based on selected SKU
- Quantity control with min `1` and max equal to stock
- Add-to-cart flow with loading state, success feedback, and cart count
- Product loading state
- Product API error state
- Add-to-cart error handling
- Out-of-stock add-to-cart disabled state
- Basic `add_to_cart` analytics logging through `console.info`

## Main Files

- `src/components/ProductPage.tsx`
- `src/components/VariantSelector.tsx`
- `src/components/QuantityControl.tsx`
- `src/data/product.ts`
- `src/api/productApi.ts`
- `src/api/cartApi.ts`
- `src/types.ts`
