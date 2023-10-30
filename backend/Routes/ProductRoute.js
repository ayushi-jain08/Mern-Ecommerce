const express = require("express");
const router = express.Router();
const {
  PostProduct,
  GetProduct,
  getSingleProduct,
  PostAddToCart,
  getCart,
  UpdateCart,
  DeleteCartProduct,
  AddToWishList,
  GetWishList,
  UpdateProduct,
  GetRelatedProuct,
  GetCheckout,
} = require("../Controller/ProductCtrl");
const auth = require("../Middleware/auth");

router.post("/create", PostProduct);
router.get("/getproduct", GetProduct);
router.get("/getproduct/:id", getSingleProduct);
router.get("/related-product/:productId", GetRelatedProuct);
router.patch("/updateproduct/:id", UpdateProduct);
router.post("/addtocart", auth, PostAddToCart);
router.get("/getcart", auth, getCart);
router.post("/updatecart", auth, UpdateCart);
router.delete("/deletecart", auth, DeleteCartProduct);
router.post("/addtowishlist", auth, AddToWishList);
router.get("/getwishlist", auth, GetWishList);

module.exports = router;
