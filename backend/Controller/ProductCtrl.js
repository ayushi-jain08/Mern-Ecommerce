const Product = require("../Model/Product")
const cloudinary = require("cloudinary").v2;
const User = require("../Model/UserModel")

cloudinary.config({
    cloud_name: process.env.NAME,
    api_key:  process.env.KEY,
    api_secret: process.env.SECRET,
  });
// =============CREATE PRODUCT==================
const PostProduct = async(req,res) => {
    const {shortTitle, longTitle, brand, desc, mrp, cost, discount, feature, category, subcategory}  = req.body;
    if (!req.files || !req.files.img) {
        return res.status(400).json({ message: "Image file is required." });
      }
const imageFiles = req.files.img;
const imageUrls = [];
const folder = "images";
for(const file of imageFiles){
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
  folder,
    })
    imageUrls.push(result.url)
}
try {
    const product = new Product({
      shortTitle,
      longTitle,
      brand,
      desc,
      mrp,
      cost,
      discount,
      feature,
      category,
      subcategory,
      images: imageUrls
    })
    console.log(imageUrls);
const saveProduct = await product.save()
res.status(200).json({ message: "Product created successfully.",
data: saveProduct,})
} catch (error) {
    res.status(400).json({
        success: false,
        message: error,
      });
}
}

// =====================GET ALL PRODUCT=====================
const GetProduct = async(req,res) => {
 try {
  const page = parseInt(req.query.page) || 1;
  const perpage = 5

  const startIndex = (page - 1) * perpage

  const brandFilter = req.query.brand ? { brand: req.query.brand } : {}
  const categoryFilter = req.query.category ? { category: req.query.category } : {}

  const totalProducts = await Product.countDocuments();
  const totalPages = Math.ceil(totalProducts / perpage);

  let query = Product.find({ ...brandFilter, ...categoryFilter })
  .skip(startIndex)
  .limit(perpage);

  if (req.query.sort) {
    // Apply sorting if a sorting option is provided
    const sortDirection = req.query.sort === 'desc' ? -1 : 1;
    query = query.sort({ cost: sortDirection });
  }
  
  const products = await query;
    if(!products){
       res.status(400).json({
           meassage: "no product found"
       })
    }else{
      res.status(200).json({
        products,
        totalProducts,
        totalPages,
        currentPage: page,
      });
    }
 } catch (error) {
  res.status(400).json({
    message: error,
  });
 }

}

// =================GET SINGLE PRODUCT======================
const getSingleProduct = async(req,res) => {
const {id} = req.params

try {
  const product = await Product.findById(id)
  if(product){
    res.status(200).json(product)
  }else{
    res.status(400).json({
      message:"product not found"
    })
  }
} catch (error) {
  res.status(500).json({meassage: `Server Error: ${error}`})
}
}
// ========================GET RELATED PRODUCT=================
const GetRelatedProuct = async(req,res) => {
const {productId} = req.params
try {
  const product = await Product.findById(productId)
  const relatedProduct = await Product.find({
    category: product.category,
    _id: { $ne: productId },
  }).limit(5);

  res.status(200).json(relatedProduct)
} catch (error) {
  console.error(err);
    res.status(500).json({ message: 'Server Error' })
}
}

// ==================UPDATE PRODUCT======================
const UpdateProduct = async(req,res) => {
  const {id} = req.params
  try {
    // Find the product by ID
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Update product properties based on request body
    if (req.body.name) {
      product.name = req.body.name;
    }

    if (req.body.description) {
      product.description = req.body.description;
    }

    if (req.body.price) {
      product.price = req.body.price;
    }

    if (req.body.brand) {
      product.brand = req.body.brand;
    }
    if(req.body.subcategory){
      product.subcategory = req.body.subcategory
    }

    // Save the updated product
    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      updatedProduct: product,
    });
  } catch (error) {
    res.status(500).json({
      message: `Server Error: ${error}`,
    });
  }
}
// ====================ADD TO CART PRODUCTS===================
const PostAddToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ message: "Invalid User" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      console.error(`Product with ID ${productId} not found.`);
      return res.status(404).json({ message: "Product not found" });
    }

    const existingCartItem = user.cart.find((cartItem) =>
      cartItem.product.equals(product._id)
    );

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      user.markModified("cart");
    } else {
      user.cart.push({ product: product._id, quantity: quantity });
    }

    await user.save();

    return res.status(200).json({ message: "Item added to cart successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: "Internal server error" });
  }
};


// ======================GET ADD TO CART PRODUCTS===================
const getCart = async(req,res) => {
try {
  const user = await User.findById(req.user._id).populate('cart.product')
  if (!user) {
    return res.status(401).json({ error: 'Invalid User' });
  }
  
  const cartWithSubtotal = user.cart.map((cartItem) => ({
    ...cartItem.toObject(),
    subtotal: cartItem.product.cost * cartItem.quantity,
  }));
  res.status(200).json(cartWithSubtotal);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
}
}

// =======================UPDATE PRODUCT QUANTITY====================
const UpdateCart = async(req,res) => {
  try {
    const {productId, operation} = req.body

    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(401).json({ error: "Invalid User" });
    }
    const cartItems = user.cart.find((cartitem) => cartitem.product.toString() === productId )

    if (!cartItems) {
      return res.status(404).json({ error: "Product not found in cart" });
    }
    if(operation === "increase"){
      cartItems.quantity +=1
    }else if(operation === "decrease"){
      if(cartItems.quantity > 1){
        cartItems.quantity -=1
      }
    }
    user.markModified("cart");
await user.save();

res.status(200).json({ message: "Cart quantity updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  }

// ===============DELETE ITEM FROM CART================
const DeleteCartProduct = async(req,res) => {
 try {
  const {productId} = req.body
  const user = await User.findById(req.user._id)

  if (!user) {
    return res.status(401).json({ error: "Invalid User" });
  }
  const productIndex = user.cart.findIndex((cartitem) => cartitem.product.toHexString() === productId) 
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found in cart' });
  }
  // Remove the product from the cart array
  user.cart.splice(productIndex, 1);

  await user.save();
  res.status(200).json({ message: 'Product removed from cart' });
 } catch (error) {
  console.error(error);
    res.status(500).json({ message: 'Internal Server Error' })
 }
}

// ==================ADD TO WISHLIST==================
const AddToWishList = async(req,res) => {
  try {
    const { productId } = req.body
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(401).json({ error: "Invalid User" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      console.error(`Product with ID ${productId} not found.`);
      return res.status(404).json({ message: "Product not found" });
    }
    const existingwishItem =  user.wishlist.find((wishitem) => wishitem.product.toString() === productId)

    if(existingwishItem){
      user.wishlist.pull({product: product._id})
      await user.save();
     return res.status(200).json({ success: true, productId, added: false });
    }else{
    user.wishlist.push({product: product._id})
    await user.save();
   return res.status(200).json({ success: true, productId, added: true });
    }
    
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: "Internal server error" });
  }
}

// ==========================GET WISHLIST====================
const GetWishList = async(req,res) => {
    try {
      const user = await User.findById(req.user._id).populate('wishlist.product')
      if (!user) {
        return res.status(401).json({ error: 'Invalid User' });
      }
      const wishlistItem = user.wishlist.map((wishitem) =>({
        ...wishitem.toObject()
      }));
      res.status(200).json(wishlistItem)
    } catch (error) {
      console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = {PostProduct, GetProduct, getSingleProduct, PostAddToCart, getCart, UpdateCart, DeleteCartProduct, AddToWishList, GetWishList, UpdateProduct, GetRelatedProuct}

