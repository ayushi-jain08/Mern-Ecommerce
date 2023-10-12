const User = require("../Model/UserModel");
const cloudinary = require("cloudinary").v2;
const bcrypt = require('bcrypt')
const GenerateToken = require('../Utils/GenerateToken')

cloudinary.config({
  cloud_name: process.env.NAME,
  api_key: process.env.KEY,
  api_secret: process.env.SECRET,
});
// =============REGISTER USER===================
const registerUser = async (req, res) => {
  if (!req.files || !req.files.photo) {
    return res.status(400).json({ message: "Image file is required." });
  }
  const file = req.files.photo;
  const folder = "images";

  const result = cloudinary.uploader.upload(file.tempFilePath, { folder });
  try {
    const users = new User({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      work: req.body.work,
      password: req.body.password,
      pic: (await result).url,
    });
    console.log((await result).url);
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      res.status(400).send({
        success: false,
        message: "This email already exist",
      });
    } else {
      const user_data = await users.save();
      res.status(200).json(user_data);
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "failed to registered",
      error,
    });
    console.log(error);
  }
};
// ===================LOGIN USER====================
const loginUser = async (req,res) => {

try {
  let token;
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({ error: "Please fill the data" });
    }
    const userLogin = await User.findOne({email})
    console.log(userLogin)

    if(!userLogin){
return res.status(400).json({ error: "invalid email" })
    }else{
       const isMatch = await bcrypt.compare(password, userLogin.password);

       if(!isMatch){
  res.status(400).json({ error: "Invalid Credential" });
       }
        res.status(200).json({
            _id: userLogin._id,
            name: userLogin.name,
            email: userLogin.email,
            mobile: userLogin.mobile,
            work: userLogin.work,
            pic: userLogin.pic,
            token: GenerateToken(userLogin._id)
        })
       }
  }
    catch (error) {
    console.log(error);
}
}

// ===================USER DATA=======================
const aboutUser = async(req,res) => {
try {
    const user = await User.findById(req.user._id)
    if(!user){
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
     _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      work: user.work,
      pic: user.pic
    })
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
}
}


// ======================CONTACT US FORM======================
const PostContact = async(req,res) => {
  const {name, email, message, userId} = req.body
  try {
   const ConatctSubmit = {name, email, message, timestamp: new Date(),}
   const user = await User.findById(userId);
    user.contactFormSubmissions.push(ConatctSubmit);

    await user.save();

    res.status(200).json({ message: 'Contact form submitted successfully.' })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request.' })
  }
}
module.exports = { registerUser, loginUser, aboutUser , PostContact};
