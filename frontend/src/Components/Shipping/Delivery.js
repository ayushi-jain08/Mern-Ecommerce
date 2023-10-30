import React from 'react'
import "./Delivery.css"
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const Delivery = ({step, steps}) => {
    console.log("dd", step)
  return (
    <>
        <div className="icons-shipping">
          <div className="icons-left">
            <span style={{color:step === 1 ? "orangered":"black"}}><LocalShippingIcon/></span>
            <span className="first" style={{background:step === 1 ? "orangered": "black"}}></span>
          </div>

          <div className="icons-center">
            <span style={{color:step === 1 ? "orangered":"black"}}>
            <LibraryAddCheckIcon />
            </span>
            <span className="second" style={{background:steps === 2 ? "orangered": "black"}}></span>
          </div>

          <div className="right">
          <span style={{color:steps === 2 ? "orangered":"black"}}>
          <AccountBalanceIcon />
          </span>
          </div>
        </div>

        <div className="shipping-title">
      <h4>Shipping Details</h4>
      <h4>Confirm Order</h4>
      <h4>Payment</h4>

        </div>
    </>
  )
}

export default Delivery
