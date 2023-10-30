import React, { useEffect } from "react";
import "./Cart.css";
import img1 from "../../../Images/co.jpg";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import RemoveCircleSharpIcon from "@mui/icons-material/RemoveCircleSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { useDispatch, useSelector } from "react-redux";
import { RemoveCartProduct, fetchCartProduct, fetchUpdateCartQty } from "../../../ReduxToolkit/Slices/ProductSlice";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EmptyCart from "./EmptyCart";


const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userdata = useSelector((state) => state.user)
  const {loggedIn, userInfo} = userdata
  const cartDetails = useSelector((state) => state.products )
  const {cartProductInfo, laoding, error} = cartDetails
  useEffect(() => {
  if(userInfo === ""){
navigate("/login")
  }
  dispatch(fetchCartProduct())
  },[dispatch])
  const handleQuantitychange = async(productId, operation) => {
  try {
  await  dispatch(fetchUpdateCartQty({productId, operation}))
     dispatch(fetchCartProduct())
  } catch (error) {
    console.log(error)
  }
  }
  const handleDelete = async(productId) => {
 await dispatch(RemoveCartProduct(productId))
await dispatch(fetchCartProduct())
  }

  const totalSubtotal = cartProductInfo.reduce((accumulator, cartItem) => {
    const itemSubtotal = cartItem.product.cost * cartItem.quantity;
    return accumulator + itemSubtotal;
   
  }, 0);
  return (
    <>
      <div className="carts">
       {cartProductInfo.length !== 0 ?  <div className="sub-cart">
          <div className="header">
            <h2 className="product">Product</h2>
            <h2 className="price">price</h2>
            <h2 className="qty">quantity</h2>
            <h2 className="total">total</h2>
            <h2 className="delete">delete</h2>
          </div>
         
        {cartProductInfo.map((item) => {
          const {longTitle,brand, cost, images, _id  } = item.product
          return(
            <>
             <div className="content" key={_id}>
            <div className="product">
              <img src={images[0]} alt="" width={70} height={70} />
              <div className="details">
              <Link to={`/product/${_id}`}>
              <p>{longTitle}</p>
              </Link>
                <p>Size: S</p>
                <p>Brand: {brand}</p>
              </div>
            </div>
            <div className="price">
              <p style={{ fontWeight: 600, fontSize: "16px" }}>${cost}</p>
            </div>
            <div className="qty">
              <div className="item">
                <span onClick={() => handleQuantitychange(_id, "increase")}>
                  <AddCircleSharpIcon />
                </span>
                <p>{item.quantity}</p>
                <span onClick={() => handleQuantitychange(_id, "decrease")}>
                  <RemoveCircleSharpIcon />
                </span>
              </div>
            </div>
            <div className="total">
              <p style={{ fontWeight: 600, fontSize: "16px" }}>${item.subtotal}</p>
            </div>
            <div className="delete">
              <button onClick={() => handleDelete(_id)}>
                <DeleteSharpIcon className="del" />
              </button>
            </div>
          </div>
          </>
          )
        })}
          <div className="bottom">
          <NavLink to="/product">
          <button className="continue">Continue Shopping</button>
          </NavLink>
           <button className="clear">Clear Cart</button>
          </div>
          <div className="subtotal">
            <p style={{float:'right'}}>Subtotal: ${totalSubtotal}</p>
            <br />
            <p style={{clear:'both'}}>Taxes & Shipping calulated at Checkout</p>
           <NavLink to="/shipping">
           <button className="shipping-btn">Check Out</button>
           </NavLink>
          </div>
         </div>: <EmptyCart/>}
        </div>
   
    </>
  );
};

export default Cart;
