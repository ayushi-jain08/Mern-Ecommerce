const moongose = require("mongoose");
const ProductSchema = moongose.Schema(
  {
shortTitle: {
          type: String,
          required: true,
        },
longTitle: {
          type: String,
          required: true,
        },
    brand: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
      mrp: {
          type: Number,
          required: true,
        },
          cost: {
          type: Number,
          required: true,
        },
          discount: {
          type: String,
          required: true,
        },
    feature: {
      type: Boolean,
      require: true,
      default: false,
    },
    category: {
      // Add the category field
      type: String,
      required: true,
      enum: ["spices", "women", "grains", "men","electronic"], // Specify the allowed categories
    },
    subcategory: { type: moongose.Schema.Types.ObjectId, ref: 'Subcategory' , required:true},
    images: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Product = moongose.model("Product", ProductSchema);

module.exports = Product;
