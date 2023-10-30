import React from 'react'
import Delivery from '../Shipping/Delivery'
import "./Success.css"
import CheckIcon from '@mui/icons-material/Check';
import { Link } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Success = () => {

  return (
    <>
      <div className="success-order">
      <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div className='order-placed'>
<div className="tick">
<CheckIcon/>
</div>
<h2>Your Order has been Placed successfully</h2>
</div>
      </div>
   <NavLink to="/orders">
   <button className='order-success-btn'>View Orders</button>
   </NavLink>
      </div>
    </>
  )
}

export default Success
