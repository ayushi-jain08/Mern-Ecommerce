import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { fetchGetReview, fetchPostReview } from '../../ReduxToolkit/Slices/ProductSlice'
import { useNavigate } from 'react-router-dom'

const PostReview = ({productId}) => {
    const [rating, setRating] = useState('')
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const selector = useSelector((state) => state.user)
    const {loggedIn} = selector
    const navigate = useNavigate()
  
    const submitHandler = async (e) => {
        e.preventDefault()
        if(!rating || !comment){
            toast.warning("please write something")
        }
        if(loggedIn){
         await dispatch(fetchPostReview({productId,rating,comment}))
         await dispatch(fetchGetReview(productId))
          toast.dark("your review uploaded successfully")
          setRating('')
          setComment('')
            
        }else{
         
          navigate("/login")
        }
    }
  return (
    <>
   <div>
      <h1>Add Review Here</h1>
    <form onSubmit={submitHandler}>
   <div className="form-group">
   <input type="number"  min="1" placeholder='rating'
          max="5" name='rating' value={rating} onChange={(e) => setRating(e.target.value)}/>
      <textarea name="comment" id="comment"  placeholder='your comment...' value={comment} onChange={(e) => setComment(e.target.value)}></textarea>     
   </div>
   <button className='btn' type='submit'>Submit</button>
      </form>
   </div>
    </>
  )
}

export default PostReview
