import React, { useEffect, useState } from 'react'
import "./Register.css"
import img1 from "../../Images/sign.png"
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WorkIcon from '@mui/icons-material/Work';
import HttpsIcon from '@mui/icons-material/Https';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister } from '../../ReduxToolkit/Slices/UserSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../Loadings/Loading';


const Register = () => {
const navigate = useNavigate()
const dispatch = useDispatch()
const users = useSelector((state) => state.user)
const {loading, error} = users
const [user, setUser] = useState({
  name: "",
  email: "",
  mobile: "",
  work: "",
  password: "",
  cpassword: "",
})
const [pic, setPic] = useState("")
const [loggedIn, setLoggedIn] = useState(false);

let name;
let value;

const handleInput = async (e) => {
  name = e.target.name
  value = e.target.value
  setUser({...user, [name]: value})
}

const hanldeSubmit = (e) => {
  e.preventDefault()
  const {password, cpassword, name,email, mobile,work} = user
  if (!name || !email || !mobile || !work || !password || !cpassword) {
    console.log("password do not match")
    toast.error(" Please Fill All Details")
  }else{
    dispatch(fetchRegister({name,email,mobile,work,password,pic}))
    toast.success("Registered successfully")
    setLoggedIn(true)
  }
}
useEffect(() => {
  if (loggedIn) {
    const navigationTimeout = setTimeout(() => {
     navigate('/login'); 
    }, 2000);
    return () => clearTimeout(navigationTimeout);
  }
}, [loggedIn, navigate]);
  return (
    <>
       <div className="signup">
     {loading ? <Loading/> : <>
     <div className="container">
        <div className="signup-content">
          <div className="signup-form">
            <h2>Sign-Up</h2>
            <form className='register-form' onSubmit={hanldeSubmit}>
            <div className="form-group">
              <span><PersonIcon/></span>
              <input type="text" placeholder='Your name' name='name' value={user.name} onChange={handleInput}/>
             </div>
             <div className="form-group">
             <span><EmailIcon/></span>
             <input type="email" placeholder='your email' name='email' value={user.email} onChange={handleInput}/>
             </div>
             <div className="form-group">
             <span><PhoneIcon/></span>
             <input type="number" placeholder='your number' name='mobile' value={user.mobile} onChange={handleInput} />
             </div>
             <div className="form-group">
             <span><WorkIcon /></span>
             <input type="text" placeholder='your proffesion' name='work' value={user.work} onChange={handleInput}/>
             </div>
             <div className="form-group">
             <span><HttpsIcon/></span>
             <input type="password" placeholder='your password' name='password' value={user.password} onChange={handleInput}/>
             </div>
             <div className="form-group">
             <span><HttpsIcon/></span>
             <input type="password" placeholder='your confirm password'name='cpassword' value={user.cpassword} onChange={handleInput} />
             </div>
             <div className="form-group">
              <span><AccountBoxIcon/></span>
              <input name='photo'
          type="file"
          placeholder="Choose file"
          onChange={(e) => setPic(e.target.files[0])} 
          />
             </div>
             <button type='submit' className='signup-btn'>Submit</button>
            </form>
          </div>
        </div>
        <div className="picture">
<img src={img1} alt="" />
        </div>
      </div>
     </>}
     </div>
     <ToastContainer/>
    </>
  )
}

export default Register
