import React from 'react'
const EditReview = ({handleSaveChanges, updatedReviewData, setUpdatedReviewData}) => {
  return (
    <>
      <div className='edit-review'>
      <span>Edit Review</span>
  
   <div className="form-group">
   <input type="number"  min="1" placeholder='rating'
          max="5" name='rating'  value={updatedReviewData.rating}
          onChange={(e) =>
            setUpdatedReviewData({
              ...updatedReviewData,
              rating: e.target.value,
            })
          }/>
  </div>
     <div className="form-group">
     <textarea name="comment" id="comment"  placeholder='your comment...'  value={updatedReviewData.comment}
          onChange={(e) =>
            setUpdatedReviewData({
              ...updatedReviewData,
              comment: e.target.value,
            })
          }></textarea>     
     </div>
 
   <button className='edit-btn' onClick={handleSaveChanges}>Submit</button>
     
   </div>
    </>
  )
}

export default EditReview
