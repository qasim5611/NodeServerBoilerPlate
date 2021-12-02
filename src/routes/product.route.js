var express = require("express");
var router = express.Router();
const passport = require("passport");

var ProductController = require("../controllers/product.controller");

const redis = require('redis')
const responseTime = require('response-time')
const { promisify } = require('util')
const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
});

const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.set).bind(client);


// app.use(responseTime());
// client.on("error", (error) => {
//   client.disconnect(true);
//   console.log(`[*] Redis error:\n${error}`);
// });
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

// Cache middleware
 async function cache(req, res, next) {

  try{
       const reply = await GET_ASYNC("id");
         if (reply) {
           console.log("using cached data");
           res.send(JSON.parse(reply));
           return;
         } else {
           next();
         }

  }
  catch(e){
    return res.status(400).json({ status: 400, message: e.message });
  }

}











router.get("/getproductbyid", cache, ProductController.getproductbyid);


// router.get("/testproductbyid", cache );

// @route   GET /getProductByUserid/  
  // @desc    Get Product by other Userid Schema
  // @access  Public
router.get("/getProductByUserid", ProductController.getProductByUserid);



module.exports = router;
