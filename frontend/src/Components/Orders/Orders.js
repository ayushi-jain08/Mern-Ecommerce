import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchAllOrders } from '../../ReduxToolkit/Slices/ProductSlice'
import "./Orders.css"
import { Link } from 'react-router-dom'
import LaunchIcon from '@mui/icons-material/Launch';

const Orders = () => {
    const dispatch = useDispatch()
    const product = useSelector((state) => state.products)
    const {allOrders} = product
    useEffect(() => {
        dispatch(FetchAllOrders())
    },[])
    console.log("Orders", allOrders)
  return (
    <>
      <div className="orders-container">
      <div className="orders-main">
      <div className="orders-header">
            <h2 className="order-id">OrderId</h2>
            <h2 className="status">Status</h2>
            <h2 className="qty">Quantity</h2>
            <h2 className="amt">Amount</h2>
            <h2>Actions</h2>
          </div>
          {allOrders.length !== 0 && <div>
            {allOrders.map((item) => (
              <div className='content'>
<p>{item._id}</p>
<p>{item.orderStatus
}</p>
<p>{item.orderItems.length}</p>
<p>{item.totalPrice}</p>
<Link to={`/order/${item._id}`}>
<p><LaunchIcon/></p>
</Link>
              </div>
            ))}
            </div>}
      </div>
      </div>
    </>
  )
}

export default Orders
