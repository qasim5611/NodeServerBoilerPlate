var express = require("express");
var router = express.Router();
const passport = require("passport");

var ProductController = require("../controllers/product.controller");

  // @route   POST /createproduct/
  // @desc    Product added
  // @access  Public
router.post("/createproduct", ProductController.createproduct);
//  @route   POST /updateproduct/  
//   @desc    Update Product by id
//   @access  Public
router.post("/updateproduct", ProductController.updateproduct);
// @route   POST /deleteProduct/  
  // @desc    Delete Product by id
  // @access  Public
router.get("/deleteproduct", ProductController.deleteproduct);
//  // @route   GET /getproductbyid/  
//   // @desc    GET Product by ids
//   // @access  Public
router.get("/getproductbyid", ProductController.getproductbyid);
// @route   GET /getProductByUserid/  
  // @desc    Get Product by other Userid Schema
  // @access  Public
router.get("/getProductByUserid", ProductController.getProductByUserid);



module.exports = router;
