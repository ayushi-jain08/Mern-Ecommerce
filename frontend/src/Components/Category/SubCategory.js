import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSubCategory } from '../../ReduxToolkit/Slices/ProductSlice'
import { NavLink, useParams } from 'react-router-dom'
import Slider from '../../Pages/Home/Slider'

const SubCategory = () => {
    const {categoryId} = useParams()
    console.log(categoryId)
    const dispatch = useDispatch()
    const category = useSelector((state) => state.products)
    const {SubCategory} = category
    const {name, subcategories} = SubCategory
    useEffect(() => {
        dispatch(fetchSubCategory(categoryId))
    },[dispatch,categoryId])
    console.log(SubCategory)
    if (SubCategory.length === 0) {
        return <div>No subcategories available.</div>;
      }
  return (
    <>
      <div className="sub-category">
      <span className='sub-head'>Shop   {name}</span>
      <div className="sub-category-sub">
        {subcategories && subcategories.map((item) => {
            return(
                <div className="sub-details">
                    <img src={item.image} alt="image" width={50} height={50} />
                   <NavLink to={`/subcategories/${item._id}`}>
                   <h1>{item.name}</h1>
                   </NavLink>
                </div>
            )
        })}
      </div>
      </div>
      <Slider/>
    </>
  )
}

export default SubCategory
