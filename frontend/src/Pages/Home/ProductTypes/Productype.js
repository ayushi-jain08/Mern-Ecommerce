import React, { useEffect } from "react";
import "./Producttype.css";
import img1 from "../../../Images/co.jpg"
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSubCategory } from "../../../ReduxToolkit/Slices/ProductSlice";
import { NavLink } from "react-router-dom";

const Productype = () => {
  const dispatch = useDispatch()
  const category = useSelector((state) => state.products)
  const {allSubcategory} = category
  useEffect(() => {
    dispatch(fetchAllSubCategory())
  },[dispatch])
  console.log("all",allSubcategory)
  const slicedAllSubcategory = allSubcategory.slice(0, 10);
  return (

    <>
      <div className="product-types">
      {slicedAllSubcategory.map((item) => {
        return(
          <div className="flex" key={item._id}>
          <div className="content">
          <NavLink to={`/subcategories/${item._id}`}><p>{item.name}</p></NavLink>
            <span>8 items</span>
          </div>
         <div className="img">
            <img src={item.image} alt="" width={100} height={100}/>
         </div>
        </div>
        )
      })}
  
     
      </div>
    </>
  );
};

export default Productype;
