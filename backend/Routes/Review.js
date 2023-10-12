const express = require("express")
const auth = require("../Middleware/auth")
const { PostReview, GetReview, EditReview, DeleteReview } = require("../Controller/Review")
const router = express.Router()

router.post('/product/:productId/review', auth, PostReview )
router.get("/product/:productId/getreview",  GetReview)
router.patch("/:reviewId/review", auth, EditReview )
router.delete("/:reviewId/review", auth, DeleteReview)
module.exports = router