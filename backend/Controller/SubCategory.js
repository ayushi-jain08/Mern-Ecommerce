const subcategory = require('../Model/SubCategory')
const cloudinary = require("cloudinary").v2;
const Product = require("../Model/Product");
const SubCategory = require('../Model/SubCategory');

cloudinary.config({
    cloud_name: process.env.NAME,
    api_key: process.env.KEY,
    api_secret: process.env.SECRET,
  });

//   ========================POST SUBCATEGORY===========================

  const CreateSubcategory = async(req,res) => {
    if (!req.files || !req.files.photo) {
        return res.status(400).json({ message: "Image file is required." });
      }
      const file = req.files.photo;
      const folder = "images";

      const result = cloudinary.uploader.upload(file.tempFilePath, {
        folder,
      });

    try {  
        const {name} = req.body
          const subcategory = new SubCategory({
            name,
          image: (await result).secure_url,
          })
          const saveSubcategory = await subcategory.save();
        res.status(200).json(saveSubcategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error", error });
    }
  }
// ==========================GET SUBCATEGORY===================================
const GetSubCategory = async(req,res) => {
  try {
    const subcategories = await SubCategory.find();
    res.status(200).json(subcategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', error });
  }
}

//   ========================GET SINGLE SUBCATEGORY==================
const GetSingleSubcategory = async(req,res) => {
    try {
        const {subcategoryID} = req.params
         console.log('Subcategory ID:', subcategoryID);
         const products = await Product.find({ subcategory: subcategoryID });
         console.log('Products:', products); 
         if (!products || products.length === 0) {
           return res.status(404).json({ message: "No products found for the specified subcategory." });
         }
         res.status(200).json(products);
       } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Server error', error });
       }
}


module.exports = {CreateSubcategory, GetSingleSubcategory, GetSubCategory}