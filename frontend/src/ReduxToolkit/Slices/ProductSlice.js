import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllProduct = createAsyncThunk(
  'data/fetchAllProduct',
  async ({ page, sort, brand }) => {
    try {
      const response = await fetch(
        `http://localhost:6001/api/getproduct?page=${page}&sort=${sort}&brand=${brand}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json", // Fix the header syntax
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        return {
          products: data.products,
          totalPages: data.totalPages,
          totalProducts: data.totalProducts,
          currentPage: data.currentPage,
        };
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while fetching user profile.");
    }
  }
);
// =======================GET SINGLE PRODUCT======================
export const fetchSingleProduct = createAsyncThunk('data/fetchSingleProduct', async(id,thunkAPI) => {
try {
    const response = await fetch(`http://localhost:6001/api/getproduct/${id}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json", // Fix the header syntax
        },
    })
    const data = await response.json()
    if(response.ok){
        return data;
    }else{
        throw new Error(data.message);
    }

} catch (error) {
    throw new Error("An error occurred while fetching user profile.");
}
})
//  ==============ADD TO CARTS======================
export const AddToCart = createAsyncThunk('data/AddToCart', async ({ productId, quantity }) => {
  try {
    const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
    const response = await fetch("http://localhost:6001/api/addtocart", {
      method: 'POST',
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${StoredUserInfo.token}`,
      },
      body: JSON.stringify({ productId, quantity }) // Use the correct parameter name here
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    throw new Error("An error occurred while processing your request.");
  }
});

// ======================GET CART PRODUCT==========================
export const fetchCartProduct = createAsyncThunk('data/fetchCartData', async(_,thunkAPI) => {
  try {
    const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
    const response = await fetch("http://localhost:6001/api/getcart", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${StoredUserInfo.token}`,
      }
    })
    const data = await response.json()
    if(response.ok){
      return data;
    }else{
      throw new Error(data.message);
    }
  } catch (error) {
    throw new Error("An error occurred while processing your request.");
  }
});
// ======================UPDATE CART QUANTITY=======================
export const fetchUpdateCartQty = createAsyncThunk('data/fetchUpdateCartQty', async({productId, operation}) => {
  try {
    const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
    const response = await fetch("http://localhost:6001/api/updatecart", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${StoredUserInfo.token}`,
      },
      body: JSON.stringify({productId,operation})
    })
    const data = await response.json()
    if(response.ok){
      return data;
    }else{
      throw new Error(data.message);
    }
  } catch (error) {
    throw new Error("An error occurred while processing your request.");
  }
})

// ===========================DELETE PRODUCTS FROM CART=====================
export const RemoveCartProduct = createAsyncThunk('data/RemoveCartProduct', async(productId) => {
try {
  const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
  const response = await fetch("http://localhost:6001/api/deletecart",{
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${StoredUserInfo.token}`,
    },
    body: JSON.stringify({productId})
  })
  const data = await response.json()
  if(response.ok){
    return data;
  }else{
    throw new Error(data.message);
  }
} catch (error) {
  throw new Error("An error occurred while processing your request.");
}
})

// ========================ADD TO WISHLIST===================
export const AddToWishList = createAsyncThunk('data/AddToWishList', async(productId) => {
  try {
    const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
    const response = await fetch("http://localhost:6001/api/addtowishlist", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${StoredUserInfo.token}`,
      },
      body: JSON.stringify({productId})
    })
    const data = await response.json()
  if(response.ok){
    return data;
  }else{
    throw new Error(data.message);
  }
  } catch (error) {
    throw new Error("An  while processing your request.");
  }
})
//  ========================GET WISHLIST PRODUCT======================
export const fetchWishListItem = createAsyncThunk("data/fetchWishListItem", async(_,thunkAPI) => {
  try {
    const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
    const response = await fetch("http://localhost:6001/api/getwishlist", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${StoredUserInfo.token}`,
      }
    })
    const data = await response.json()
    if(response.ok){
      return data
    }else{
      throw new Error(data.message);
    }
  } catch (error) {
    throw new Error("An error occurred while processing your request.");
  }
})
// ======================POST REVIEW=======================
export const fetchPostReview = createAsyncThunk("data/fetchPostReview", async({productId,rating,comment}) => {
  try {
    const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
    const response = await fetch(`http://localhost:6001/api/product/${productId}/review`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${StoredUserInfo.token}`,
      },
      body : JSON.stringify({rating, comment})
    })
    const data = await response.json()
    if(response.ok){
      return data;
    }else{
      throw new Error(data.message);
    }
  } catch (error) {
    throw new Error("An error occurred while processing your request.");
  }
})

// =========================GET REVIEW=============================
export const fetchGetReview = createAsyncThunk("data/fetchGetReview ", async(productId) => {
  try {
    const response = await fetch(`http://localhost:6001/api/product/${productId}/getreview`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    if(response.ok){
      return data;
    }else{
      throw new Error(data.message);
    }
  } catch (error) {
    throw new Error("An error occurred while processing your request.");
  }
})

// ==================EDIT REVIEW======================
export const fetchEditReview = createAsyncThunk('data/fetchEditReview', async({reviewId, updatedReviewData}) => {
try {
  const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
  const response = await fetch(`http://localhost:6001/api/${reviewId}/review`, {
    method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${StoredUserInfo.token}`,
      },
      body: JSON.stringify(updatedReviewData)
  })
  const data = await response.json()
    if(response.ok){
      return data
    }else{
      throw new Error(data.message)
  }
} catch (error) {
  throw new Error("An error occurred while processing your request.");
}
})

// ============================DELETE REVIEW==========================
export const fetchDeleteReview = createAsyncThunk("data/fetchDeleteReview", async(reviewId) => {
  try {
    const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
    const response = await fetch(`http://localhost:6001/api/${reviewId}/review`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${StoredUserInfo.token}`,
      },
    })
    const data = await response.json()
    if(response.ok){
      return reviewId
    }
    else{
      throw new Error(data.message)
  }
  } catch (error) {
    throw new Error("An error occurred while processing your request.");
  }
})

// ==========================GET CATEGORIES=========================
export const fetchGetCategory = createAsyncThunk("data/fetchGetCategory", async() => {
  try {
    const response = await fetch("http://localhost:6001/api/categories", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    if(response.ok){
      return data
    }
    else{
      throw new Error(data.message)
  }
  } catch (error) {
    throw new Error("An error occurred while processing your request.");
  }
})

// ====================GET SUBCATEGORY======================
export const fetchSubCategory = createAsyncThunk("data/fetchSubCategory ", async(categoryId) => {
  try {
    const response = await fetch(`http://localhost:6001/api/categories/${categoryId}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    if(response.ok){
      return data
    }
    else{
      throw new Error(data.message)
  }
  } catch (error) {
    throw new Error("An error occurred while processing your request.");
  }
})

// =================GET SUBCATEGORY PRODUCT=====================
export const fetchSucategoryProduct = createAsyncThunk("data/fetchSucategoryProduct", async(subcategoryID) => {
try {
  const response = await fetch(`http://localhost:6001/api/subcategory/${subcategoryID}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await response.json()
  if(response.ok){
    return data
  }
  else{
    throw new Error(data.message)
}
} catch (error) {
  throw new Error("An error occurred while processing your request.");
}
})
// =====================GET RELATED PRODUCT=====================
export const fetchRelatedProduct = createAsyncThunk("data/fetchRelatedProducts", async(productId) => {
  try {
    const response = await fetch(`http://localhost:6001/api/related-product/${productId}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    if(response.ok){
      return data
    }
    else{
      throw new Error(data.message)
  } 
  } catch (error) {
    throw new Error("An error occurred while processing your request.");
  }
})
export const fetchAllSubCategory = createAsyncThunk("data/fetchAllSubCategory ", async() => {
  try {
    const response = await fetch('http://localhost:6001/api/subcategories' , {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    if(response.ok){
      return data
    }
    else{
      throw new Error(data.message)
  } 
  } catch (error) {
    throw new Error("An error occurred while processing your request.");
  }
})
const initializeWishlistFromLocalStorage = () => {
  const wishlistData = localStorage.getItem('wishlist');
  return wishlistData ? JSON.parse(wishlistData) : [];
};
const initialState = {
  allProductInfo: [],
  totalPage: 0,
  totalProduct: 0,
  currentPages: 0, // Typo: Should be 'currentPage'
  singleProduct: [],
  addProduct: [],
  cartProductInfo: [],
  addWishlist: initializeWishlistFromLocalStorage(),
  wishListProductInfo: [],
  allReview: [],
  mainCategory: [],
  SubCategory: [],
  SubCategoryProduct: [],
  relatedProduct: [],
  allSubcategory: [],
  loading: false,
  error: null,
};

const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSubCategoryProduct: (state) => {
      state.SubCategoryProduct = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.allProductInfo = action.payload.products;
        state.totalPage = action.payload.totalPages;
        state.totalProduct = action.payload.totalProducts;
        state.currentPages = action.payload.currentPage; // Typo: Should be 'currentPage'
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSingleProduct.fulfilled, (state,action) => {
        state.loading = false
        state.singleProduct = action.payload
      })
      .addCase(fetchSingleProduct.rejected, (state,action) => {
        state.loading = false
        state.error = action.error.message;
      })
      .addCase(AddToCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(AddToCart.fulfilled, (state,action) => {
        state.loading = false
       state.addProduct.push(action.payload)
      })
      .addCase(AddToCart.rejected, (state,action) => {
        state.loading = false
        state.error = action.error.message;
      })
      .addCase(fetchCartProduct.pending, (state) => {
        state.loading = true
        state.error = null;
      })
      .addCase(fetchCartProduct.fulfilled, (state,action) => {
        state.loading = false
        state.cartProductInfo = action.payload;
      })
      .addCase(fetchCartProduct.rejected, (state,action) => {
        state.loading =false
        state.error = action.error.message
      })
      .addCase(fetchUpdateCartQty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpdateCartQty.fulfilled, (state, action) => {
        state.loading = false;
        // Find the cart item by productId and update its quantity
        const updatedCartItems = state.cartProductInfo.map(item => {
          if (item.product._id === action.payload.productId) {
            return {
              ...item,
              quantity:
                action.payload.operation === 'increase'
                  ? item.quantity + 1
                  : item.quantity - 1,
            };
          }
          return item;
        });
        state.cartProductInfo = updatedCartItems;
      })
      .addCase(fetchUpdateCartQty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(RemoveCartProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(RemoveCartProduct.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the item from fetchCartItems array using filter
        state.cartProductInfo = state.cartProductInfo.filter(item => item.product._id !== action.payload.productId);
      })
      .addCase(RemoveCartProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(AddToWishList.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(AddToWishList.fulfilled, (state,action) => {
        state.loading = false
        const { productId, added } = action.payload;
        console.log(productId, added)
        if (added) {
          // Add the product to the wishlist if it was added
          state.addWishlist.push(productId);
        } else {
          // Remove the product from the wishlist if it was removed
          state.addWishlist = state.addWishlist.filter((id) => id !== productId);
        }
        localStorage.setItem('wishlist', JSON.stringify(state.addWishlist));
      })
      .addCase(AddToWishList.rejected, (state,action) => {
        state.loading = false
        state.error = action.error.message;
      })
      .addCase(fetchWishListItem.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWishListItem.fulfilled, (state,action) => {
        state.loading = false
       state.wishListProductInfo = action.payload
      })
      .addCase(fetchWishListItem.rejected, (state,action) => {
        state.loading = false
        state.error = action.error.message;
      })
      .addCase(fetchGetReview.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchGetReview.fulfilled, (state, action) => {
        state.loading = false
        state.allReview = action.payload
      })
      .addCase(fetchGetReview.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
      .addCase(fetchEditReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEditReview.fulfilled, (state, action) => {
        state.loading = false
        const updatedReview = action.payload; // Assuming the API returns the updated review

        state.allReview = state.allReview.map((review) =>
          review._id === updatedReview._id ? updatedReview : review
        );
        // state.allReview = action.payload
      })
      .addCase(fetchEditReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDeleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeleteReview.fulfilled, (state, action) => {
        state.loading = false;
        const deletedReviewId = action.payload;
        // Filter out the deleted review from the array
        state.allReview = state.allReview.filter((review) => review._id !== deletedReviewId);
      })
      .addCase(fetchDeleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchGetCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGetCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.mainCategory = action.payload; // Update the state with fetched categories
      })
      .addCase(fetchGetCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.SubCategory = action.payload; // Update the state with fetched categories
      })
      .addCase(fetchSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSucategoryProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSucategoryProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.SubCategoryProduct = action.payload; // Update the state with fetched categories
      })
      .addCase(fetchSucategoryProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchRelatedProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRelatedProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedProduct = action.payload; // Update the state with fetched categories
      })
      .addCase(fetchRelatedProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.allSubcategory = action.payload; // Update the state with fetched categories
      })
  },
});
export const {clearSubCategoryProduct} = ProductSlice.actions
export default ProductSlice.reducer;
