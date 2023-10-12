const mongoose = require('mongoose'); // Erase if already required
const bycrpyt = require("bcrypt")
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    work: {
        type: String,
        required: true,
      },
    password:{
        type:String,
        required:true,
    },
    pic: {
        type: String,
        required: true,
      },
      cart: [{
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
      }],
      wishlist : [{
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        }}
      ] ,
      review : [
{
  type: mongoose.Schema.Types.ObjectId,
  ref: "Review",
}
      ],
      contactFormSubmissions: [
        {
          name: {
            type: String,
            required: true,
          },
          email: {
            type: String,
            required: true,
          },
          message: {
            type: String,
            required: true,
          },
          timestamp: {
            type: Date,
            default: Date.now,
          },
        },
      ]

});


userSchema.pre('save', async function(next){
  if(this.isModified('password')){
    this.password = await bycrpyt.hash(this.password,10)
  }
  next()
})
//Export the model
module.exports = mongoose.model('User', userSchema);