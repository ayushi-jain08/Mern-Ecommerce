import React from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const Features = () => {
  return (
    <>
      <div className="features">
        <div className="free-shipping flex">
          <span >
            <LocalShippingIcon className="icon"/>
          </span>
          <div className="content">
            <p>Free shipping</p>
            <span>From all orders above $100 </span>
          </div>
        </div>
        <div className="offers flex">
          <span>
            <CardGiftcardIcon className="icon"/>
          </span>
          <div className="content">
            <p>Daily Surprise Offers </p>
            <span>Save upto 25% off </span>
          </div>
        </div>
        <div className="support flex">
          <span>
            <SupportAgentIcon className="icon"/>
          </span>
          <div className="content">
            <p>Support 24/7</p>
            <span>Shop with an expert </span>
          </div>
        </div>
        <div className="prices flex">
          <span>
            <LocalOfferIcon className="icon" />
          </span>
          <div className="content">
            <p>Affordable Prices</p>
            <span>Get Factory direct prices </span>
          </div>
        </div>
        <div className="secure flex">
          <span >
            <CreditCardIcon className="icon" />
          </span>
          <div className="content">
            <p>Secure Payments</p>
            <span>100% Protected Payments</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
