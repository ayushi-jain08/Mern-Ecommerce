// models/Subcategory.js
const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  name: String,
  image: {
    type: String,
    required: true,
  },// URL to the subcategory image
});

module.exports = mongoose.model('subcategories', subcategorySchema);
