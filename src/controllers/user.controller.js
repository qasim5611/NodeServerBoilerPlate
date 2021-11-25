const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("./../config/keys");
const passport = require("passport");
const UserService = require("../services/user.service");
// Load Input Validation
const validateUserInput = require("../validation/register");
const validateUpdatedInput = require("../validation/validUpdateInput");

const validateUserIdField = require("../validation/useridFiels");


exports.adduser = async function (req, res, next) {
  // Validate request parameters, queries using validator npm
     let { email, password, title, firstName, lastName, acceptTerms, domain } =  req.body;
     const { errors, isValid } = validateUserInput(req.body);
     if (!isValid) {
       // Return any errors with 400 status
       return res.status(400).json(errors);
     }
     let useremail = req.body.email;
 try {
// var page = req.params.page ? req.params.page : 1;
// var limit = req.params.limit ? req.params.limit : 1;
 var userscheck = await UserService.CheckifUserExistAlready({ useremail });
         if (userscheck == true) {
            return res.status(200).json({ error: "Email already exists" });
         } 
         else if (userscheck == false ) {
           let newUser = {
             email: req.body.email,
             password: req.body.password,
             title: req.body.title,
             firstName: req.body.firstName,
             lastName: req.body.lastName,
             acceptTerms: req.body.acceptTerms,
             domain: req.body.domain,
           };
           bcrypt.genSalt(10, (err, salt) => {
             bcrypt.hash(newUser.password, salt, (err, hash) => {
               if (err) throw err;
               newUser.password = hash;
             });
           });
          var isAdded = await UserService.addNewuser({ newUser });
          if (isAdded == true) {
            return res.status(200).json({ msg: "User added Successfully" });
          } 
          else if(isAdded == false){
            return res.status(400).json({ error: "User Not added" });
          }
         }  
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message, msg: "something disturbed" });
    }
};

exports.readuser = async function (req, res, next) {
  try {
        var isuserRead = await UserService.readuser();
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

exports.readuserByid = async function (req, res, next) {
  try {
     let { id } =  req.body;
     const { errors, isValid } = validateUserIdField(req.body);
     if (!isValid) {
       // Return any errors with 400 status
       return res.status(400).json(errors);
     }

     let userid = req.body.id;
     var userscheck = await UserService.FindUserById({ userid });
         if (userscheck) {
            return res.status(200).json({ msg: "User founded" , message: userscheck });
         } 
         else {
            return res.status(400).json({ error: "User Not founded"  });

         }
       
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.deleteuserByid = async function (req, res, next) {
  // Validate request parameters, queries using validator npm

  const { errors, isValid } = validateUserIdField(req.body);
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }
  let userid = req.body.id;
  try {
    // var page = req.params.page ? req.params.page : 1;
    // var limit = req.params.limit ? req.params.limit : 1;
    var userscheck = await UserService.CheckifIDAvailable({ userid });
    if (userscheck == true) {
     
       var isDelete = await UserService.DeleteNow({ userid });
       if (isDelete) {
         return res.status(200).json({ msg: "User deleted Successfully" });
       } else  {
         return res.status(400).json({ error: "User Not deleted" });
       }
    } else if (userscheck == false) {
       return res.status(200).json({ error: "Sorry! Deletion Id is Not Available" });

    }
  } catch (e) {
    return res
      .status(400)
      .json({ status: 400, message: e.message, msg: "something disturbed" });
  }
};

exports.updateuserByid = async function (req, res, next) {
  // Validate request parameters, queries using validator npm
  let { email, password, title, firstName, lastName, acceptTerms, domain } = req.body;
  const { errors, isValid } = validateUpdatedInput(req.body);
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }
  try {
 let userid = req.body.id;
   var userscheck = await UserService.CheckifIDAvailable({ userid });
   if (userscheck == true) {
    


    console.log("req.body.docId", req.body.id);

    let idforupdate = req.body.id;
    // let data = Object.assign({}, req.body);
    let data = {
      email: req.body.email,
      password: req.body.password,
      title: req.body.title,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      domain: req.body.domain,
    };

    let isUpdated = await UserService.UpdateUserRecord(
      { _id: idforupdate },
      data
    );
    if (isUpdated == true) {
      return res
        .status(200)
        .json({ msg: "User Updated Successfully, check on local db" });
    } else if (isUpdated == false) {
      return res.status(400).json({ error: "User Not updated!!" });
    }
   } else if (userscheck == false) {
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
