const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");
// const ProductService = require("../services/user.service");
const ProductService = require("../services/product.service");

// Load Input Validation
const validateProductInput = require("../validation/validateProduct");
const validateUpdatedInput = require("../validation/validUpdateInput");

const validateUserIdField = require("../validation/useridFiels");


exports.createproduct = async function (req, res, next) {
  // Validate request parameters, queries using validator npm
     let { name, brand, category, imgurl, color, size } = req.body;
    //  console.log(req.body);
   
 try {
   
          const { errors, isValid } = validateProductInput(req.body);
          if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
          }
            
          // let userid = req.body.id;
            let userId = req.body.id;

            let newProduct = {
              name: req.body.name,
              brand: req.body.brand,
              category: req.body.category,
              imgurl: req.body.imgurl,
              color: req.body.color,
              size: req.body.size,
              userid: userId, // Refid of User Schema in the Product  table
            };

            var isAdded = await ProductService.AddNewProduct( newProduct );
            if (isAdded == true) {
              return res.status(200).json({ msg: "Product added Successfully" });
            } else if (isAdded == false) {
              return res.status(400).json({ error: "Product Not added" });
            }
          // var userscheck = await ProductService.CheckifProductExistAlready({ userid });
        //  if (userscheck == true) {
        //     return res.status(200).json({ error: "Product Exist Alreadr , Hit on Update Route to update Product" });
        //  } 
        //  else if (userscheck == false ) {
        //   let userId = req.body.id;
        //   let newProduct = {
        //     name: req.body.name,
        //     brand: req.body.brand,
        //     category: req.body.category,
        //     imgUrl: req.body.imgUrl,
        //     color: req.body.color,
        //     size: req.body.size,
        //     user: userId,   // Refid of User Schema in the Product  table
        //   };
         
        //   var isAdded = await ProductService.addNewuser({ newProduct });
        //   if (isAdded == true) {
        //     return res.status(200).json({ msg: "User added Successfully" });
        //   } 
        //   else if(isAdded == false){
        //     return res.status(400).json({ error: "User Not added" });
        //   }
        //  }  
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message, msg: "something disturbed" });
    }
};

exports.readuser = async function (req, res, next) {
  try {
        var isuserRead = await ProductService.readuser();
        if(isuserRead){
            return res.status(200).json({ status: 200, data: isuserRead, message: "Succesfully Users Retrieved" });
        }
        else{
            return res.status(400).json({ status: 400 , message: "Not Get User data" });

        }
       
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getproductbyid = async function (req, res, next) {
  try {
    let { id } = req.body;
    const { errors, isValid } = validateUserIdField(req.body);
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    let productid = req.body.id;
    var productcheck = await ProductService.FindProductById({ productid });
    if (productcheck) {
      return res.status(200).json({ msg: "Product founded against id", message: productcheck });
    } else {
      return res.status(400).json({ error: "Product Not founded" });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};





exports.getProductByUserid = async function (req, res, next) {
  try {
    let { id } = req.body;
    //Means Validate product id field
    const { errors, isValid } = validateUserIdField(req.body);
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    let userid = req.body.id;
    //first find if this id user is available?
    var usersProductcheck = await ProductService.getProductByUserid({ userid });
    if (!usersProductcheck) {
      // var productcheck = await ProductService.FindProductByUserId({ userid });

      // if (!productcheck) {
      //   return res
      //     .status(400)
      //     .json({ error: "Product Not Found For this User Id" });
      // }
       return res.status(400).json({ error: "Product Not founded for this user" });
    }
    
   return res
     .status(200)
     .json({ msg: "Product  founded for this UserId ", message: usersProductcheck });
    
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};


exports.deleteproduct = async function (req, res, next) {
  // Validate request parameters, queries using validator npm

  const { errors, isValid } = validateUserIdField(req.body);
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }
  let prodid = req.body.id;
  try {
    var prodcheck = await ProductService.CheckifIDAvailable({ prodid });
    if (prodcheck == true) {
      var isDelete = await ProductService.DeleteNow({ prodid });
      if (isDelete) {
        return res.status(200).json({ msg: "Product deleted Successfully" });
      } else {
        return res.status(400).json({ error: "Product Not deleted" });
      }
    } else if (prodcheck == false) {
      return res
        .status(200)
        .json({ error: "Sorry! Deletion Id is Not Available" });
    }
  } catch (e) {
    return res
      .status(400)
      .json({ status: 400, message: e.message, msg: "something disturbed" });
  }
};

exports.updateproduct = async function (req, res, next) {
  // Validate request parameters, queries using validator npm
  // let { email, password, title, firstName, lastName, acceptTerms, domain } = req.body;
  const { errors, isValid } = validateProductInput(req.body);
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }
  try {
    let prodid = req.body.id;
    var prodcheck = await ProductService.CheckifIDAvailable({ prodid });
    if (prodcheck == true) {
      console.log("req.body.docId", req.body.id);

      let idforupdate = req.body.id;
      // let data = Object.assign({}, req.body);
      let data = {
        name: req.body.name,
        brand: req.body.brand,
        category: req.body.category,
        imgUrl: req.body.imgUrl,
        color: req.body.color,
        size: req.body.size,
        // user: userId, // Refid of User Schema in the Product  table
      };

      let isUpdated = await ProductService.UpdateUserRecord({ _id: idforupdate },data);
      if (isUpdated == true) {
        return res
          .status(200)
          .json({ msg: "Product Updated Successfully, check on local db" });
      } else if (isUpdated == false) {
        return res.status(400).json({ error: "Sorry! Product Id is Not Available for Update" });
      }
    }
    
    else if (prodcheck == false) {
      return res
        .status(200)
        .json({ error: "Sorry! Product Id is Not Available for Update" });
    }
  } catch (e) {
    return res
      .status(400)
      .json({ status: 400, message: e.message, msg: "something disturbed" });
  }
};
