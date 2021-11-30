var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imgurl: {
    type: String,
    required: true,
  },
  //   acceptTerms: Boolean,
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
});


module.exports = Product = mongoose.model("Product", ProductSchema);
