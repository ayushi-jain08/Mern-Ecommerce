import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProduct } from '../../ReduxToolkit/Slices/ProductSlice'
import StoreIcon from '@mui/icons-material/Store';

const AllProduct = () => {
  const dispatch = useDispatch()
  const [sortOrder, setSortOrder] = useState('')
  const [brandFilter, setBrandFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [tPages, setTPages] = useState(1);
  const product = useSelector((state) => state.products)
  const {allProductInfo, loading ,error, totalPage,totalProduct, currentPages} = product


  const brands = ["Nature’s Bounty", "Maharaja", "Mom's Magic", "Zara"];
  useEffect(() => {
    dispatch(fetchAllProduct({page:currentPage, sort:sortOrder, clicked:false, brand: brandFilter  }))
    setTPages(totalPage)
  },[dispatch, currentPage, brandFilter])
  console.log(allProductInfo)

  const handleSortChange = (order) => {
    setSortOrder(order);
    dispatch(fetchAllProduct({ page: currentPage, sort:order, brand:brandFilter  }));
  
};
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleBrandClick = (brand) => {
    setBrandFilter(brand);
    dispatch(fetchAllProduct({ page: currentPage, brand:brand  }));
  };
  if(loading){
    <div>Loading...</div>
  }
  return (
    <>
      <div className="all-product">
        <div className="sub-products">
        <div className="left">
            <div className='shop'>
              <h3> <StoreIcon/> Shop by Brand</h3>
                <ul>
                {brands.map((brand) => (
          <li
            key={brand}
            className={brandFilter === brand ? "selected" : ""}
            onClick={() => handleBrandClick(brand)}
          >
            {brand}
          </li>
        ))}
                  
                </ul>
            </div>
            <div className='filter'>
                Filter
            </div>
        </div>
        <div className="right">
            <div className='sort'>
             <p style={{fontSize:14, fontWeight:700}}> Sort :</p>
            <select
              name=""
              className='select'

              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOrder}
            >
              <option className='opt' value="asc">lowest to highest</option>
              <option className='opt' value="desc">highest to lowest</option>
            </select>
            </div>
            <div className='product'>
            <ProductCard allProductInfo={allProductInfo}/>
            </div>
        </div>
        </div>
        <div className="pagination">
        {Array.from({ length: totalPage }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
      </div>
    </>
  )
}

export default AllProduct
