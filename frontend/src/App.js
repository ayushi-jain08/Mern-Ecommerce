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


function App() {

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
      </Routes>
    </>
  );
}

export default App;
