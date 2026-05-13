import heroImage from '../assets/hero.png'
import type { Product } from '../types'

export const product: Product = {
  id: 'aeris-pod',
  name: 'Aeris Charge Pod',
  description:
    'A compact wireless charging pod with a soft-touch finish, travel-ready case, and adaptive power output for everyday devices.',
  variants: [
    {
      name: 'color',
      label: 'Color',
      values: ['Graphite', 'Violet'],
    },
    {
      name: 'size',
      label: 'Capacity',
      values: ['10W', '15W'],
    },
  ],
  skus: [
    {
      id: 'graphite-10w',
      color: 'Graphite',
      size: '10W',
      price: 49,
      stock: 8,
      imageUrl: heroImage,
    },
    {
      id: 'graphite-15w',
      color: 'Graphite',
      size: '15W',
      price: 65,
      stock: 3,
      imageUrl: heroImage,
    },
    {
      id: 'violet-10w',
      color: 'Violet',
      size: '10W',
      price: 52,
      stock: 0,
      imageUrl: heroImage,
    },
    {
      id: 'violet-15w',
      color: 'Violet',
      size: '15W',
      price: 69,
      stock: 5,
      imageUrl: heroImage,
    },
  ],
}
