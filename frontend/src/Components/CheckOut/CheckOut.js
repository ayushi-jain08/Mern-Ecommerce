import React, { useEffect, useRef } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import EventIcon from "@mui/icons-material/Event";
import Delivery from "../Shipping/Delivery";
import "./CheckOut.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreateOrder } from "../../ReduxToolkit/Slices/ProductSlice";

const CheckOut = () => {
  const dispatch = useDispatch()
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
  const paybtn = useRef(null)
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()

const productInfo = useSelector((state) => state.products)
const {cartProductInfo, shippingInfo} = productInfo
const users = useSelector((state) => state.user)
const { userInfo} = users


const paymentData = {
  amount: Math.round(orderInfo.totalPrice * 100),
};
console.log('paymentData', paymentData.amount)
console.log("cartProductInfo", cartProductInfo)

  const submitHandler = async(e) => {
e.preventDefault()
paybtn.current.disabled = true

const StoredUserInfo = JSON.parse(
  localStorage.getItem("userDataInfo")
);
 try {
  const response = await fetch("http://localhost:6001/api/payment/process", {
    method: "POST",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${StoredUserInfo.token}`,
      },
      body: JSON.stringify({amounts:paymentData.amount})
})
const data = await response.json();
const client_secret = data. client_secret

if(!stripe || !elements) return

const result = await stripe.confirmCardPayment(client_secret, {
  payment_method: {
    card: elements.getElement(CardNumberElement),
    billing_details: {
      name: userInfo.name,
      email: userInfo.email,
      address: {
        line1: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        postal_code: shippingInfo.pinCode,
        country: shippingInfo.country,
      },
    },
  },
});

if (result.error) {
  paybtn.current.disabled = false;
   alert(result.error.message);
} else {
  if (result.paymentIntent.status === "succeeded") {
    const paymentInfo = {
      id: result.paymentIntent.id,
      status: result.paymentIntent.status,
    }
    const orderItems = cartProductInfo.map((cartProduct) => {
      return {
        shortTitle:cartProduct.product.shortTitle,
        quantity: cartProduct.quantity,
        cost: cartProduct.product.cost,
        image: cartProduct.product.images[0],
        product: cartProduct.product._id
      };
    });
   console.log("orderItems", orderItems)
    dispatch(CreateOrder({shippingInfo:shippingInfo,orderItems:orderItems, paymentInfo, itemsPrice:orderInfo.totalSubtotal, taxPrice:orderInfo.tax, shippingPrice:orderInfo.shippingCharges, totalPrice:orderInfo.totalPrice}))
navigate("/success")
  }
  else {
    alert("There's some issue while processing payment ");
  }
 }
  }
 catch (error) {
  paybtn.current.disabled = false
  console.log(error)
 }
  }
  return (
    <div className="payment">
      <Delivery step={1} steps={2} />
      <div className="payment-container">
        <form onSubmit={(e) => submitHandler(e)} className="payment-form">
          <p>Card Info</p>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="payment-input" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="payment-input" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="payment-input" />
          </div>
          <input type="submit" value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`} ref={paybtn} className="payment-btn" />
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
