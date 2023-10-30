import React from "react";
import "./Footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import logo from "./../../Images/wix.png";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <img src={logo} alt="" className="footer-img" />
        <div className="upper-footer-head">
            <p>Brands</p>
            <p>Media</p>
            <p>Services</p>
        </div>
     <span className="divider"></span>
        <div className="footer-subhead">
          <ul>
            <li>
             <Link>
             Contact us
             </Link>
            </li>
            <li>
             <Link>
             Our Services
             </Link>
            </li>
            <li>
              <Link>Privacy Policy</Link>
            </li>
            <li>
              <Link>About</Link>
            </li>
            <li>
              <Link>Terms & Conditions</Link>
            </li>
            <li>
              <Link>Career</Link>
            </li>
          </ul>
        </div>
        <div className="footer-icons">
     <p><FacebookIcon/></p>
     <p><InstagramIcon/></p>
     <p><YouTubeIcon/></p>
     <p><TwitterIcon/></p>
      </div>
      <p className="footer-bottom">INFERNO Copyright © 2021 Inferno - All rights reserved || Designed By: Ayushi Jain </p>
      </div>
    </>
  );
};

export default Footer;
