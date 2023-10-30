import React, { useEffect, useState } from "react";
import "./SingleProduct.css";
import Images from "./Images";
import StarRateIcon from "@mui/icons-material/StarRate";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import RemoveCircleSharpIcon from "@mui/icons-material/RemoveCircleSharp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Accordions from "./Accordions";
import Review from "../Reviews/Review";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart, AddToWishList, fetchCartProduct, fetchGetReview, fetchRelatedProduct, fetchSingleProduct } from "../../ReduxToolkit/Slices/ProductSlice";
import Loading from "../Loadings/Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostReview from "../Reviews/PostReview";
import Relatedproduct from "./Relatedproduct";

const SingleProduct = () => {
  const [count, setCount] = useState(1)
  const { ids } = useParams()
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.user)
  const {userInfo, loggedIn} = userData
  const productDetail = useSelector((state) => state.products)
  const { singleProduct, loading, error, addProduct, addWishlist, allReview, relatedProduct} = productDetail
  const { _id, shortTitle, longTitle, brand,  desc, mrp, cost, discount, category, images} = singleProduct
  const [heartFill, setHeartFill] = useState(false)
  const [averageRating, setAverageRating] = useState(0)

   const handleWishList = async(productId) => {
   if(!loggedIn){
    toast.dark("[please logged in")
   }
   dispatch(AddToWishList(productId))
   
   }
const increment = () => {
  setCount((prevCount) => prevCount + 1);
}
const decrement = () => {
  if (count > 1) {
    setCount((prevCount) => prevCount - 1);
  }
}

const handleAddToCart = async () => {
  if(!loggedIn){
    toast.warning('Please log in to add items to your cart.');
    return;
  }
  await dispatch(AddToCart({productId: _id, quantity:count }))
  await dispatch(fetchCartProduct())
 toast.success('Item successfully added to cart')

}
useEffect(() => {
  if(ids && ids !== ''){
    dispatch(fetchSingleProduct(ids))
    dispatch(fetchRelatedProduct(ids))
    dispatch(fetchGetReview(ids))
  }
},[dispatch, ids])

useEffect(() => {
  if (Array.isArray(allReview) && allReview.length > 0) {
    const totalRating = allReview
      .filter((review) => typeof review.rating === 'number')
      .reduce((acc, review) => acc + review.rating, 0);

    const numberOfRatings = allReview.filter(
      (review) => typeof review.rating === 'number'
    ).length;

    const avgRating = numberOfRatings ? totalRating / numberOfRatings : 0;

    setAverageRating(avgRating);
  }
}, [allReview]);



console.log("rrr", relatedProduct)
  return (
    <>
      <div className="single-product">
        {loading && <Loading/>}
        <div className="sub-single">
          <div className="left">
            <Images images={images}/>
          </div>
          <div className="right">
            <div className="content">
              <h2>{longTitle}</h2>
              <span className="price">Rs.{cost} <strike>{mrp}</strike>
              <p style={{fontSize:25, color:'red', marginLeft:20, fontWeight:500}}>{discount} Off</p>
              </span>
            
              <div className="icons">
                <div className="star">
                {Array.from({ length: 5 }).map((_, index) => (
            <StarRateIcon
              key={index}
              className={index < averageRating ? "filled-star" : "empty-star"}
            />
          ))}
                </div>
                <div className="rating">({allReview.length}     Review)</div>
              </div>
              <p className="brand">
                <strong style={{ color: "black" }}>Brand : </strong>{brand}
              </p>
              <p className="category">
                <strong style={{ color: "black" }}>Category : </strong>{category}
              </p>
              <p className="desc">
                <strong style={{ color: "black" }}>Description : </strong>{desc}
              </p>
              <p className="stock">
                <strong style={{ color: "black" }}>Availibility : </strong> 242
                in Stock
              </p>
              <div className="qty">
                <span>
                  <strong>Qunatity : </strong>
                </span>
                <span onClick={increment}>
                  <AddCircleSharpIcon />
                </span>
                <p>{count}</p>
                <span onClick={decrement}>
                  <RemoveCircleSharpIcon />
                </span>
              </div>
            </div>
            <div className="lower-content">
              <span className="heart" onClick={() => handleWishList(_id)}>
               {addWishlist.includes(_id) ? <>
                <FavoriteIcon className="red"/>
                <p>Remove from wishlist</p>
               </> : <>
               <FavoriteIcon className="white"/>
                <p>Add to wishlist</p>
               </>}
              </span>
              <div className="btn">
                <button className="add" onClick={handleAddToCart}>Add To Cart</button>
                <button className="buy">Buy It Now</button>
              </div>
            </div>
           <div className="accor">
           <Accordions/>
           </div>
           <div className="post-review">
            <PostReview productId={_id}/>
           </div>
          </div>
        </div>
        <div className="review">
         {allReview && allReview.length > 0 ? ( <Review allReview={allReview} ids={ids}/>):(<p>No Review Yet</p>)}
        </div>
      </div>
      {/* <ToastContainer 
      autoClose={3000}
      
      theme="dark"
      /> */}
    {relatedProduct.length > 0 && <div className="related">
      <Relatedproduct product={relatedProduct}/>
      </div>} 
    </>
  );
};

export default SingleProduct;
