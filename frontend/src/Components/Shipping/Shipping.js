import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { Country, State } from "country-state-city";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import "./Shipping.css";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../ReduxToolkit/Slices/ProductSlice";
import { Divider } from "@mui/material";
import Delivery from "./Delivery";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
 const navigate = useNavigate()
  const dispatch = useDispatch();
  const shipping = useSelector((state) => state.products);
  const { shippingInfo } = shipping;
  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/confirm-order")
  };
  console.log("shipping", shippingInfo);
  
  useEffect(() => {
    if (shippingInfo) {
      setAddress(shippingInfo.address);
      setCity(shippingInfo.city);
      setState(shippingInfo.state);
      setCountry(shippingInfo.country);
      setPinCode(shippingInfo.pinCode);
      setPhoneNo(shippingInfo.phoneNo);
    }
  }, [shippingInfo]);
  return (
    <>
      <div className="shipping-cont">
      <Delivery step={0}/>
        <div className="shipping-box">
          <h2 className="shippingHeading">Shipping Details</h2>
          <form className="form" onSubmit={shippingSubmit}>
            <div className="form-control">
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="form-control">
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="form-control">
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div className="form-control">
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>
            <div className="form-control">
              <PublicIcon />
              <select
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              >
                <option>Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option value={item.isoCode} key={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            {country && (
              <div className="form-control">
                <TransferWithinAStationIcon />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option value={item.isoCode} key={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <input
              type="submit"
              value="Continue"
              className="shipping-btn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
