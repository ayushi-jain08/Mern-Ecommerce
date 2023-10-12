import React, { useEffect } from "react";
import "./Category.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetCategory } from "../../ReduxToolkit/Slices/ProductSlice";
import { NavLink } from "react-router-dom";

const Category = ({showCategory}) => {
  const dispatch = useDispatch()
  const category = useSelector((state) => state.products)
  const {mainCategory} = category
  const userData = useSelector((state) => state.user)
  const {loggedIn, userInfo} = userData

  useEffect(() => {
    dispatch(fetchGetCategory())
  },[dispatch])
  console.log("category",mainCategory)
  return (
    <>
      <div className="categorys">
        <div className="categorys-container">
          <div className="top">
          <span>
          <AccountCircleIcon className="icon" />
          </span>
         {loggedIn ? <p>Hello, {userInfo.name}</p> : <p>Hello, sign in</p>}
           <span onClick={() => showCategory(false)}>
           <CloseIcon className="close" />
           </span>
          </div>
          <div className="main-category">
            <h2>Trending</h2>
{mainCategory.map((item) => {
  return(
    <ul>
      <li style={{color:"black"}}>
        <NavLink to={`/category/${item._id}`}>
          {item.name}
        </NavLink>
      </li>
    </ul>
  )
})}
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
