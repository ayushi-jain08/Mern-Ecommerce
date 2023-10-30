import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct } from "../../ReduxToolkit/Slices/ProductSlice";

const ProductPage = () => {
  const dispatch = useDispatch()
  const productDetail = useSelector((state) => state.products)
  const { allProductInfo} = productDetail
  const featuredProducts = allProductInfo.filter((product) => product.feature === true);
  console.log('featuredProducts', featuredProducts)

  useEffect(() => {
    dispatch(fetchAllProduct({page:'',sort:"",brand:'', category:''}))
  },[dispatch])

  return (
   
      <div className="product-page">
        <h2>Featured Product</h2>
        <div className="product">
          <ProductCard allProductInfo={featuredProducts}/>
        </div>
      </div>
  
  );
};

export default ProductPage;
