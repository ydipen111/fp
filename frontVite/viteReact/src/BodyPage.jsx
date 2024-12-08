import React from 'react'
import { TopProducts } from './features/product/TopProducts'
import { Products } from './features/product/Products'

export const BodyPage = () => {
  return (
    <div>
      <TopProducts />
      <Products />
    </div>
  )
}
