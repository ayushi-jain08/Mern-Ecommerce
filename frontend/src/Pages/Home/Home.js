import React from 'react'
import "./Home.css"
import Banner from './Banner'
import Features from './Features'
import Productype from './ProductTypes/Productype'
import ProductPage from '../../Components/Products/ProductPage'
import Slider from './Slider'


const Home = () => {
  
  return (
    <>
      <div className="home">
       <Banner/>
       <div className="sub-home">
        <Features/>
        <Productype/>
        <ProductPage/>
        <Slider/>
        <br />
        <br />
       </div>

      </div>
    </>
  )
}

export default Home
