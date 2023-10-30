import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { GetSingleOrder } from "../../ReduxToolkit/Slices/ProductSlice";
import "./OrderDetail.css"

const OrderDetail = () => {
  const orderInfo = useSelector((state) => state.products);
  const { SingleOrder } = orderInfo;
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(GetSingleOrder(id));
  }, [id]);
  console.log("SingleOrder", SingleOrder);

  return (
    <>
      <div className="single-order">
      <div className="single-sub-order">
      <h2 style={{color:'orangered'}}>Order #{SingleOrder._id}</h2>
        <div className="shipping-info">
        <h5 style={{fontWeight:500, fontFamily:'serif', fontSize:'27px', marginBottom:'15px',marginTop:'5px'}}>Shipping Info</h5>
        <div className="confirm-shipping-info">
        <div>
            <p>Name:</p>
            <span>{SingleOrder.user && SingleOrder.user.name}</span>
          </div>
          <div>
            <p>Phone:</p>
            <span>
              {SingleOrder.shippingInfo && SingleOrder.shippingInfo.phoneNo}
            </span>
          </div>
          <div>
            <p>Address:</p>
            <span>
              {SingleOrder.shippingInfo &&
                `${SingleOrder.shippingInfo.address}, ${SingleOrder.shippingInfo.city}, ${SingleOrder.shippingInfo.state}, ${SingleOrder.shippingInfo.pinCode}, ${SingleOrder.shippingInfo.country}`}
            </span>
          </div>
        </div>
        </div>
        <h5  style={{fontWeight:500, fontFamily:'serif', fontSize:'29px', marginTop:'10px', marginBottom:'5px'}}>Payment</h5>
        <div className="payment-order-info">
          <div>
            <p style={{marginBottom:'0', fontSize:'20px'}}
              className={
                SingleOrder.paymentInfo &&
                SingleOrder.paymentInfo.status === "succeeded"
                  ? "greenColor"
                  : "redColor"
              }
            >
              {SingleOrder.paymentInfo &&
              SingleOrder.paymentInfo.status === "succeeded"
                ? "PAID"
                : "NOT PAID"}
            </p>
          </div>
          <div>
                  <p>Amount:</p>
                  <span>{SingleOrder.totalPrice && SingleOrder.totalPrice}</span>
                </div> 
        </div>
        <h5  style={{fontWeight:500, marginBottom:'0px', fontFamily:'serif', fontSize:'27px', marginTop:'10px'}}>Order Status</h5>
        <div className="order-status">
        <div>
                  <p
                  style={{marginBottom:'0',fontSize:'20px'}}
                    className={
                      SingleOrder.orderStatus && SingleOrder.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {SingleOrder.orderStatus && SingleOrder.orderStatus}
                  </p>
                </div>
        </div>
      </div>
      <hr />
        <div className="order-item">
          <h3 style={{fontWeight:500, fontFamily:'serif', fontSize:'27px', marginBottom:'15px',marginTop:'5px'}}>Order Items:</h3>
          <div className="order-confirmitems-container">
            {SingleOrder?.orderItems && 
            SingleOrder?.orderItems
.map((item) => {
  return(
    <div key={item?._id} className="full-order-details">
    <div className="details-order">
      <img
        src={item?.image}
        alt="Product"
        width={100}
        height={100}
      />
   <Link to={`/product/${item.product}`}>
   <p style={{color:'gray', fontWeight:500}}>{item.shortTitle}</p>
   </Link>
    </div>
    <span>
      {item?.quantity} X ₹{item?.cost} ={" "}
      <b
        style={{ color: "rgb(72, 69, 69)", fontWeight: 600 }}
      >
        ₹{item.cost * item.quantity}
      </b>
    </span>
  </div>
  )
})
}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
