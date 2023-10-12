const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    productId: {type: mongoose.Schema.Types.ObjectId, ref:'Product'},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    rating:Number,
    comment: String,
})

const Review = mongoose.model('Review', ReviewSchema)

module.exports = Review