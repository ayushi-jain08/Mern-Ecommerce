import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchLogout,
  fetchUserData,
} from "../../ReduxToolkit/Slices/UserSlice";
import "./AboutUser.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../Loadings/Loading";

const AboutUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const { userInfo, loggedIn, loading } = userData;
  console.log(userInfo);

  useEffect(() => {
    if (loggedIn) {
      navigate("/login");
    } else {
      dispatch(fetchUserData());
    }
  },[dispatch]);
  const handleLogout = async () => {
     dispatch(fetchLogout());
    toast.warning("Logout successfully")
  };
  return (
    <>
      <div className="about-profile">
        {loading && <Loading/>}
        <div className="container">
          <div className="content">
            <div className="top">
              <div className="top-left">
                <img src={userInfo.pic} alt="" width={250} height={250} />
              </div>
              <div className="top-right">
                <div className="profile-head">
                  <h2>{userInfo.name}</h2>
                  <span>{userInfo.work}</span>
                  <p>
                    RANKINGS: <span>1/10</span>
                  </p>
                  <div className="profile-about">
                    <h3>About</h3>
                  </div>
                </div>
              </div>
              <div className="top-end">
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
            <div className="profile-details">
              <div className="details">
                <h5>Work Link</h5>
                <div className="links">
                  <a href="https://www.youtube.com" target="_thappa">
                    Youtube
                  </a>
                  <a href="https://www.youtube.com" target="_thappa">
                    Instagram
                  </a>
                  <a href="https://www.youtube.com" target="_thappa">
                    Linkdien
                  </a>
                  <a href="https://www.youtube.com" target="_thappa">
                    Google
                  </a>
                  <a href="https://www.youtube.com" target="_thappa">
                    Developer
                  </a>
                </div>
              </div>
              <div className="ids">
                <span>User Id</span>
                <span>Name</span>
                <span>Email</span>
                <span>Phone</span>
                <span>Profession</span>
              </div>
              <div className="ids-details">
                <span>{userInfo._id}</span>
                <span>{userInfo.name}</span>
                <span>{userInfo.email}</span>
                <span>{userInfo.mobile} </span>
                <span>{userInfo.work}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default AboutUser;
