/*const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  categories: [String], // An array of strings for categories (no ObjectId needed)
  subCategory: String,
  // other fields...
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
*/
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number }, // Optional: used for showing the original price if there's a discount
  categories: { type: [String], required: true }, // An array of strings for categories
  subCategory: { type: String, required: true },
  description: { type: String }, // Optional: detailed product description
  image: [{ type: String }], // Array of image URLs
  colors: [{ type: String }], // Array for available colors
  sizes: [{ type: String }], // Array for available sizes
  brand: { type: String }, // Optional: Brand of the product
  material: { type: String }, // Optional: Material of the product
  stock: { type: Number, default: 0 }, // Optional: to track stock count
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
