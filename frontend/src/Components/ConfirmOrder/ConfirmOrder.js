import React from "react";
import { useSelector } from "react-redux";
import Delivery from "../Shipping/Delivery";
import "./ConfirmOrder.css";
import {loadStripe} from '@stripe/stripe-js';
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const navigate = useNavigate()
  const cartDetails = useSelector((state) => state.products);
  const { cartProductInfo, laoding, error, shippingInfo } = cartDetails;
  const users = useSelector((state) => state.user);
  const { userInfo } = users
  console.log("cart", cartProductInfo);
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`
  const totalSubtotal = cartProductInfo.reduce((accumulator, cartItem) => {
    const itemSubtotal = cartItem.product.cost * cartItem.quantity;
    return accumulator + itemSubtotal;
  }, 0);
  const shippingCharges = totalSubtotal > 1000 ? 0 : 200;

  const tax = totalSubtotal * 0.18;

  const totalPrice = parseInt(totalSubtotal + tax + shippingCharges);

 const ProceedTopayment = () => {
  const data = {totalSubtotal, shippingCharges, tax, totalPrice}
  sessionStorage.setItem("orderInfo",JSON.stringify(data))

  navigate("/checkout")
 }
  return (
    <>
      <div className="confirm-order">
        <div className="deliverys">
          <Delivery step={1} />
        </div>
        <div className="confirm-order-divide">
          <div className="confirm-order-page">
            <div className="confirm-shipping-area">
              <h2>Shiping Information</h2>
              <div className="confirm-shipping-area-box">
                <div>
                  <p>Name:</p>
                  <span>{userInfo.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>{shippingInfo.phoneNo}</span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>{address}</span>
                </div>
              </div>
            </div>
            <div className="confirm-cart-items">
              <h2>Your Cart Items:</h2>
              <div className="confirm-cart-items-container">
                {cartProductInfo &&
                  cartProductInfo?.map((item) => (
                    <div key={item.product._id} className="full">
                      <div className="deatils">
                        <img
                          src={item?.product.images?.[0]}
                          alt="Product"
                          width={100}
                          height={100}
                        />
                        <p>{item.product.shortTitle}</p>
                      </div>
                      <span>
                        {item.quantity} X ₹{item.product.cost} ={" "}
                        <b
                          style={{ color: "rgb(72, 69, 69)", fontWeight: 600 }}
                        >
                          ₹{item.product.cost * item.quantity}
                        </b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-summary-sum"> 
              <div>
                <p>Subtotal:</p>
                <span>₹{totalSubtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>
            <div className="order-Summary-Total">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>
            <button className="proceed" onClick={ProceedTopayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
