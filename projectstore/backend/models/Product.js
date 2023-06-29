const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  dimensions: String,
  color: String,
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCategory",
  },
  pictures: [String],
  smPictures: [String],
  shortDesc: String,
  price: Number,
  salePrice: Number,
  vendor: String,
  brands: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductBrand",
    },
  ],
  review: String,
  ratings: Number,
  until: Date,
  stock: Number,
  top: Boolean,
  featured: Boolean,
  new: Boolean,
  variants: [variantSchema],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
