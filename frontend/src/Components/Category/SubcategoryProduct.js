import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { clearSubCategoryProduct, fetchSucategoryProduct } from '../../ReduxToolkit/Slices/ProductSlice'
import ProductCard from '../Products/ProductCard'
import "../Products/Product.css"

const SubcategoryProduct = () => {
   const {subcategoryId} = useParams()
   const dispatch = useDispatch()
   const category = useSelector((state) => state.products)
   const {SubCategoryProduct} = category
   useEffect(() => {
    dispatch(clearSubCategoryProduct())
    dispatch(fetchSucategoryProduct(subcategoryId))
   },[dispatch, subcategoryId])
   console.log("kkkk",SubCategoryProduct)
   console.log("ll", subcategoryId)
  return (
    <>
   <div className="sub-category-card">
   </div>
   <div className="sub-category-product-card">
     <div  className='product'>
        <ProductCard allProductInfo={SubCategoryProduct}/>
        
    </div>
   </div>
   
   </>
  )
}

export default SubcategoryProduct
