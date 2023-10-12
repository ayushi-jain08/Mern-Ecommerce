import React, { useEffect, useState } from 'react'
import products from './ProductData'
import "./Product.css"
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarRateIcon from '@mui/icons-material/StarRate';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AddToWishList, fetchWishListItem } from '../../ReduxToolkit/Slices/ProductSlice';

const ProductCard = ({allProductInfo}) => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state.products)
  const { loading, addWishlist} = selector

const handleAddToWishList = async(productId) => {
await dispatch(AddToWishList(productId))
console.log("pp", addWishlist)
}
useEffect(() => {
  dispatch(fetchWishListItem())
      },[dispatch])
      
if (!allProductInfo) {
  return <div>Loading...</div>;
}
  return (
    <>
      {/* <div className="product-card"> */}
      {allProductInfo.map((item) => {
         const isAddedToWishlist = addWishlist.includes(item._id);

        console.log(isAddedToWishlist)
        return(
           <>
            <div className="product-card" key={item._id}>
            <div className="img">
                <img src={item.images[0]} alt="" width={150} height={150}/>
            </div>
            <div className="details">
                <span className='head'>{item.shortTitle}</span>
              <NavLink to={`/product/${item._id}`}> 
              <p className='desc'>{item.desc.slice(0, 60)}...</p>
              </NavLink>
                <span><StarRateIcon className='start'/></span>
                <span><StarRateIcon className='start'/></span>  
                 <span><StarRateIcon className='start'/></span>
                 <span><StarRateIcon className='start'/></span>
                 <span><StarRateIcon className='start'/></span>
                <p><strong style={{color:'red', fontWeight:700}}>Rs.{item.cost} </strong>  <strike style={{color:'rgb(186, 179, 179)',fontWeight:600}}>{item.mrp}</strike></p>

            </div>
            <div className="wishlist" onClick={() => handleAddToWishList(item._id)}>
            {isAddedToWishlist ?  <FavoriteIcon className='red'/>: <FavoriteIcon className='white'/>}
            </div>
            </div>
           </>
        )
      })}
      {/* </div> */}
    </>
  )
}

export default ProductCard
