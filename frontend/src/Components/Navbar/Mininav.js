import React, { useState } from "react";
import "./Navbar.css";
import CategoryIcon from "@mui/icons-material/Category";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link, NavLink } from "react-router-dom";
import Category from "../Category/Category";

const Mininav = () => {
  const [showCategory, setShowCatregory] = useState(false);
  return (
    <>
      <div className="mininav">
        <div className="mininav-inner">
          <div className="left">
            <div className="category">
              <span>
                {" "}
                <CategoryIcon style={{ color: "white" }} />
              </span>
              <p style={{ color: "white" }}>SHOP CATEGORY</p>
            </div>
            <div className="op">
              <NavLink>
                <span onClick={() => setShowCatregory(!showCategory)}>
                  <ArrowDropDownIcon style={{ fontSize: 30 }} />
                </span>
                {showCategory && <Category showCategory={setShowCatregory} />}
              </NavLink>
            </div>
          </div>
          <div className="center">
            <ul>
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <NavLink to="/about-co"> 
                ABOUT
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact">CONTACT</NavLink>
              </li>
              <li>
                <NavLink to="/product">PRODUCTS</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mininav;
