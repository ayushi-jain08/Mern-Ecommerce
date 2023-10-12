import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Navbar.css";
import logo1 from "./../../Images/logo1.png";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../ReduxToolkit/Slices/UserSlice";
import { fetchCartProduct } from "../../ReduxToolkit/Slices/ProductSlice";
const Navbar = () => {
  const selector = useSelector((state) => state.user)
  const Product = useSelector((state) => state.products)
  const {cartProductInfo} = Product
  console.log("ppp",cartProductInfo.length)
  const dispatch = useDispatch()
  const {loggedIn, userInfo} = selector

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
    if(storedUserInfo){
      dispatch(setUserInfo(storedUserInfo))
      dispatch(fetchCartProduct())
    }
  },[dispatch])
  return (
    <>
      <div className="navbar">
        <div className="navbar-inner">
          <div className="navbar-content">
            <div className="left">
              <span className="logo">
                <img src={logo1} alt="" width={20} height={20} />
              </span>
            </div>
            <div className="center">
              <div className="search">
                <input type="text" placeholder="search here..." />
                <span className="icon">
                  <SearchIcon style={{ color: "black" }} />
                </span>
              </div>
            </div>
            <div className="right">
              <ul>
                <li>
                 <NavLink to="/wishlist">
                 <FavoriteBorderIcon className="icon" />
                 </NavLink>
                  <span>Favourite Wishlist</span>
                </li>
                <li>
                  {loggedIn ?  <>
                    <NavLink to="/login">
                    <img src={userInfo.pic} alt="" width={40} height={40}  style={{borderRadius:"50%", objectFit:'cover'}}/>
                  </NavLink> <span>My Account</span>
                  </> : <> <NavLink to="/login">
                    <AccountCircleIcon className="icon" />
                  </NavLink> <span>Log in My Account</span></>} 
                 
                </li>
                <li>
                 <NavLink to="/cart">
                 <ShoppingCartIcon className="icon" />
                 </NavLink>
                  <span className="badge">{cartProductInfo.length}</span>
                  <span style={{ fontSize: 14, marginLeft:2, width:30 }}> Cart</span>
                </li>
                <li style={{marginLeft:-25}}>
                <NavLink to="/register">
                <AppRegistrationIcon className="icon"/>
                </NavLink>
                  <span> New User?</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
