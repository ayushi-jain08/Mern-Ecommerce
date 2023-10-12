const Review = require("../Model/Review");
const { findById } = require("../Model/UserModel");
const router = require("../Routes/Review");
const User = require("../Model/UserModel")

// ==================POST REVIEW=====================
const PostReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;
    const { rating, comment } = req.body;

    const review = new Review({
      productId,
      userId,
      rating,
      comment,
    });
    const user = await User.findById(userId)
    user.review.push(review._id)
    await user.save()
    await review.save();
    res.status(200).json({ message: "Review created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ======================GET REVIEW============================
const GetReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const review = await Review.find({ productId }).populate(
      "userId",
      "name pic"
    );

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// =================EDIT REVIEW=========================
const EditReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const updatedReview = await Review.findByIdAndUpdate(reviewId, req.body, {
      new: true,
    });
    if(!updatedReview){
        res.status(401).json({ error: 'Review not found' })
    }
    res.status(200).json(updatedReview)
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ===================DELETE REVIEW=======================
const DeleteReview = async(req,res) => {
try {
    const {reviewId} = req.params
    const review = await Review.findById({_id:reviewId})
    if (!review) {
        return res.status(404).json({ error: 'No review' });
      }
      if(review.userId.toString() !== req.user._id.toString()){
        return res.status(403).json({ error: 'Unauthorized: You can only delete your own reviews' });
    }
    const user = await User.findById(req.user._id);
    const index = user.review.indexOf(reviewId)
    user.review.splice(index,1)
    await user.save()

    await review.deleteOne();
    res.status(200).json({success: true, message: "review deleted"});   
} catch (error) {
    res.status(500).json({ error: "Internal Server Error" })
}
}

module.exports = { PostReview, GetReview, EditReview, DeleteReview};
