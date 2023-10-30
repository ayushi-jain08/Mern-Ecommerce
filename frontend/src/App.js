import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Mininav from './Components/Navbar/Mininav';
import LoginPage from './Components/Login/LoginPage';
import Category from './Components/Category/Category';
import Register from './Components/Register/Register';
import AllProduct from './Components/Products/AllProduct';
import Cart from './Pages/Home/Cart/Cart';
import SingleProduct from './Components/SingleProduct/SingleProduct';
import AboutUser from './Components/AboutUser/AboutUser';
import Wishlist from './Pages/WishList/Wishlist';
import SubCategory from './Components/Category/SubCategory';
import SubcategoryProduct from './Components/Category/SubcategoryProduct';
import Contact from './Pages/Contact/Contact';
import CheckOut from './Components/CheckOut/CheckOut';
import Success from './Components/Success/Success';
import Cancel from './Components/Cancel/Cancel';
import Shipping from './Components/Shipping/Shipping';
import ConfirmOrder from './Components/ConfirmOrder/ConfirmOrder';
import About from './Components/About/About';
import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Orders from './Components/Orders/Orders';
import { useDispatch, useSelector } from 'react-redux';
import OrderDetail from './Components/OrderDetails.js/OrderDetail';
import Footer from './Pages/Footer/Footer';

function App() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.user)
  const {userInfo} = users
  const [stripeapiKey, setStripeApiKey] = useState("")
  const [stripeLoaded, setStripeLoaded] = useState(false);
    
  const getStripeApiKey = async() => {
    const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
    try {
      const response = await fetch(`http://localhost:6001/api/stripeapikey`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
      })
      const data = await response.json()
      if(response.ok){
        setStripeApiKey(data.StripeApikey)
        setStripeLoaded(true);
      }
      else{
        throw new Error(data.message)
    }
    } catch (error) {
      throw new Error("An error occurred while processing your request.");
    }
  }
  useEffect(() => {
    const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
    if(StoredUserInfo){
      getStripeApiKey()
    }
   
  },[])

  return (
    <>
    <Navbar/>
    <Mininav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/about' element={<AboutUser/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/category' element={<Category/>}/>
        <Route path='/product' element={<AllProduct/>}/>
        <Route path="/product/:ids" element={<SingleProduct/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path='/category/:categoryId' element={<SubCategory/>}/>
        <Route path="/subcategories/:subcategoryId" element={<SubcategoryProduct/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/success' element={<Success/>}/>
        <Route path='/cancel' element={<Cancel/>}/>
        <Route path="/shipping" element={<Shipping/>}/>
        <Route path='/confirm-order' element={<ConfirmOrder/>}/>
        <Route path='/about-co' element={<About/>}/>
<Route path='/orders' element={<Orders/>}/>
        {stripeLoaded && <Route exact path="/checkout" element={<Elements stripe={loadStripe(stripeapiKey)}> <CheckOut /></Elements>}/>}
        <Route path='/order/:id' element={<OrderDetail/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
