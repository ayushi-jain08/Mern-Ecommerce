import React from 'react'
import ProductCard from '../Products/ProductCard'

const Relatedproduct = ({product}) => {
  return (
    <>
    <h2>Related Product</h2>
      <div className="product">
        <ProductCard allProductInfo={product}/>
      </div>
    </>
  )
}

export default Relatedproduct
