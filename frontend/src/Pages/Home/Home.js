import React from 'react'
import "./Home.css"
import Banner from './Banner'
import Features from './Features'
import Productype from './ProductTypes/Productype'
import ProductPage from '../../Components/Products/ProductPage'
import Slider from './Slider'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartProduct } from '../../ReduxToolkit/Slices/ProductSlice'
import Footer from '../Footer/Footer'


const Home = () => {
  const userdata = useSelector((state) => state.user)
  const {loggedIn} = userdata
  const dispatch = useDispatch()

  if(loggedIn){
    dispatch(fetchCartProduct())
  }
  return (
    <>
      <div className="home">
       <Banner/>
       <div className="sub-home">
        <Features/>
        <Productype/>
        <Slider/>
        <ProductPage/>
        <br />
        <br />
       </div>

      </div>
    </>
  )
}

export default Home
