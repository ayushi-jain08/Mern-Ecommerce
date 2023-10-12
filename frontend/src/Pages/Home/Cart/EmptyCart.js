import React from 'react'
import gif from "../../../Images/cart.gif"
import { NavLink } from 'react-router-dom'

const EmptyCart = () => {
  return (
    <>
      <div className="empty">
      <img src={gif} alt="" />
      <p>No Item In Cart !!</p>
      <button><NavLink to="/product">
      Continue Shopping
        </NavLink></button>
      </div>
    </>
  )
}

export default EmptyCart
