import React, { useEffect } from 'react'
import "./Login.css"
import LoginCard from './LoginCard'
import { useSelector } from 'react-redux'
import AboutUser from '../AboutUser/AboutUser'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  const selector = useSelector((state) => state.user)
  const {loggedIn} = selector
  return (
    <>
     {loggedIn ? <AboutUser/> :  <div className="login">
        <div className="login-page">
       <LoginCard/>
        </div>
      </div>}
    </>
  )
}

export default LoginPage
