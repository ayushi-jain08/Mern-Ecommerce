import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddToCart, AddToWishList, fetchCartProduct, fetchWishListItem } from '../../ReduxToolkit/Slices/ProductSlice'
import img1 from "../../Images/makeup.jpg"
import "./Wishlist.css"
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'

const Wishlist = () => {
  const navigate = useNavigate()
    const dispatch = useDispatch()
    const wishlist = useSelector((state) => state.products)
    const {wishListProductInfo, addWishlist} = wishlist
const users = useSelector((state) => state.user)
const {loggedIn} = users
    useEffect(() => {
      if(!loggedIn){
        navigate("/login")
          }
dispatch(fetchWishListItem())
    },[dispatch])
    console.log("wish",wishListProductInfo)

    const handleRemove = async(productId) => {
await dispatch(AddToWishList(productId))
dispatch(fetchWishListItem())
    }
    const handleAddToCart = async (productId, quantity) => {
      if(!loggedIn){
        toast.warning('Please log in to add items to your cart.');
        return;
      }
    await dispatch(AddToCart({productId, quantity }))
    await dispatch(fetchCartProduct())
     toast.success('Item successfully added to cart')
    
    }
  return (
    <>
      <div className="wishlist-container">
        <div className="wishlist-banner">
        <div className="img">
            <img src={img1} alt="" />
        </div>
        <h1>My Wishlist</h1>
        </div>
   <div className="wishlist-main">
      <div className="wishlist-header">
            <h2 className="product">Product</h2>
            <h2 className="price">price</h2>
            <h2 className="total">Add To Cart</h2>
            <h2 className="delete">delete</h2>
          </div>
    {wishListProductInfo.length !==0 && <div> {wishListProductInfo.map((item) => {
      const {images,longTitle, brand, cost, _id} = item.product
      return(
        <>
       <div className="content" key={_id}>
        <div className="product">
        <img src={images[0]} alt="" width={70} height={70} />
              <div className="details">
              <Link to={`/product/${_id}`}>
              <p>{longTitle}</p>
              </Link>
              </div>
              </div>
              <div className="price">
              <p style={{ fontWeight: 600, fontSize: "16px" }}>${cost}</p>
            </div>
            <button className='add-btn' onClick={() => handleAddToCart(_id, 1)} >Add To Cart</button>
            <button className='remove-btn' onClick={() => handleRemove(_id)}><DeleteSharpIcon className="del" /></button>
       
       </div>
      
        </>
      )
    })}</div>}
   </div>
      </div>
    </>
  )
}

export default Wishlist
