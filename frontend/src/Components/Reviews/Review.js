import React, { useState } from 'react'
import img1 from "../../Images/coat.jpg"
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './Review.css'
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { fetchDeleteReview, fetchEditReview, fetchGetReview } from '../../ReduxToolkit/Slices/ProductSlice';
import EditReview from './EditReview';
import 'react-toastify/dist/ReactToastify.css';

const Review = ({allReview, ids}) => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.user)
  const {loggedIn,userInfo } = users
 
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [updatedReviewData, setUpdatedReviewData] = useState({
    rating: '',
    comment: '',
  });

  const handleEditReview =  (reviewId) => {
    setEditingReviewId(reviewId)
    console.log(reviewId)

    const reviewToEdit = allReview.find((review) => review._id === reviewId)

    if(reviewToEdit){
      setUpdatedReviewData({
        rating: reviewToEdit.rating,
        comment: reviewToEdit.comment
      });
    }
  }

  const handleSaveChanges = async () => {
    if(editingReviewId){
      if(!updatedReviewData.comment.trim() || !updatedReviewData.rating){
        toast.warning("please write something")
        return;
      }
      await dispatch(fetchEditReview({
        reviewId: editingReviewId,
        updatedReviewData
      }))
      toast.dark("Your Comment Updated")
        await dispatch(fetchGetReview(ids))
      setEditingReviewId(null)
    }
  }
  const handleDeleteReview = (reviewId) => {
    dispatch(fetchDeleteReview(reviewId))
      .then(() => {
        // Fetch updated reviews after deletion
        dispatch(fetchGetReview(ids));
        toast.warning("Your review is deleted successfully");
      })
      .catch((error) => {
        // Handle error
      });
  }
  return (
    <>
    {editingReviewId && <EditReview handleSaveChanges={handleSaveChanges} updatedReviewData={updatedReviewData} setUpdatedReviewData={setUpdatedReviewData}/>}
      <div className="review-container">
        <h2>Ratings & Reviews </h2>

        {allReview.map((review) => {
              return(
                <>
                 <div className="review-content">
                 <div className="full-cont">
            <div className="profile">
              <img src={review.userId.pic} alt="" className='pp' />
              <h4 style={{textTransform:'capitalize'}}>{review.userId.name}</h4>
            </div>
            <div className="btn">
               {loggedIn && userInfo && userInfo._id === review.userId._id && <>
                <button type='submit' style={{color:'black', fontSize:20}} onClick={() => handleEditReview(review._id)}><EditIcon/></button>
                <button type='submit' onClick={() => handleDeleteReview(review._id)} style={{color:'red', fontSize:20}}><DeleteIcon/></button>
               </>}
            </div>
            </div>
            <div className="comment">
                <div className="star">
                    <p><strong style={{fontWeight:700, fontSize:16}}>Rating :</strong></p>
                  <span> {review.rating}<StarIcon style={{fontSize:13}}/></span>
                </div>
                <p><strong style={{fontWeight:700, fontSize:16}}>Comment :</strong> {review.comment}</p>
            </div>
           
            
           </div>
               
                </>
              )
            })}
       
      </div>
      <ToastContainer/>
    </>
  )
}

export default Review
