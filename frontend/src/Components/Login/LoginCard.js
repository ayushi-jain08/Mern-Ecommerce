import React, { useEffect, useState } from 'react'
import log1 from "../../Images/log.png"
import { Link, useNavigate } from 'react-router-dom'
import MailOutlineTwoToneIcon from '@mui/icons-material/MailOutlineTwoTone';
import HttpsTwoToneIcon from '@mui/icons-material/HttpsTwoTone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from '../../ReduxToolkit/Slices/UserSlice';
import Loading from '../Loadings/Loading';

const LoginCard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const selector = useSelector((state) => state.user)
  const {loggedIn, loading, error} = selector
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 

   const handleSubmit = (e) => {
    e.preventDefault()
    if(!email || !password){
      toast.error("Please fill all deatils")
    }else{
      dispatch(fetchLogin({email, password}))
      navigate("/")
      toast.success("Login successfully")
    }
   }
  //  useEffect(() => {
  //   if (loggedIn) {
  //     const navigationTimeout = setTimeout(() => {
  //      navigate('/');
  //     }, 1000);
  //     return () => clearTimeout(navigationTimeout);
  //   }
  // }, [loggedIn, navigate]);
  return (
    <>
      <div className="login-container">
       <div className="login-content">
       
      {loading ? <Loading/> : <>
      <div className="profile">
            <img src={log1} alt="" />
        </div>
        <h2>Login</h2>
        <div className="detail">
    <form className='login-form' onSubmit={handleSubmit}>
    <div className="form-group">
             <span><MailOutlineTwoToneIcon/></span>
             <input type="email" placeholder='your email' value={email} onChange={(e) => setEmail(e.target.value)} />
         </div>
             <div className="form-group">
             <span><HttpsTwoToneIcon/></span>
             <input type="password" placeholder='your password' value={password} onChange={(e) => setPassword(e.target.value)}/>
             </div>
             <button type='submit' className='login-btn'>login</button>

    </form>
  <div className='account'>
 <span><Link to="/"> No account?Register</Link></span>
 <br />
 <span><Link to="/"><strong style={{color:'black'}}>Forgot Password?</strong>Click here</Link></span>
  </div>
  </div>
      </>}
       </div>
      </div>
      <ToastContainer/>
    </>
  )
}

export default LoginCard
