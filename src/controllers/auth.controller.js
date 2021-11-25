const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");
const AuthService = require("../services/auth.service");
// Load Input Validation
const validaterRegisterData = require("../validation/Authregister");
const validateLoginInput = require("../validation/AuthLogin");

const validateUserIdField = require("../validation/useridFiels");





exports.register = async function (req, res, next) {
  // Validate request parameters, queries using validator npm
  let { name , email, password, cpassword } = req.body;
  const { errors, isValid } = validaterRegisterData(req.body);
   if (!isValid) {
     return res.status(400).json(errors);
   }

   
  let useremail = req.body.email;
  let userpassword = req.body.password;

  try {
    // var page = req.params.page ? req.params.page : 1;
    // var limit = req.params.limit ? req.params.limit : 1;
    var userscheck = await AuthService.CheckifAuthExistAlready({ useremail });
    if (userscheck == true) {
      return res.status(200).json({ error: "Email already Register, Change New One" });
    }
     else if (userscheck == false) {
    
          let newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          };

          // bcrypt.genSalt(10, (err, salt) => {
          //   bcrypt.hash(newUser.password, salt, (err, hash) => {
          //     if (err) throw err;
          //     newUser.password = hash;
            
          //   });
          // });

          bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
              throw err;
            }
            newUser.password = hash;
            // Do whatever you like with the hash
          });
        // const myencppass = async function hashPassword(userpassword) {
        //   const password = userpassword;
        //   const saltRounds = 10;

        //   const hashedPassword = await new Promise((resolve, reject) => {
        //     bcrypt.hash(password, saltRounds, function (err, hash) {
        //       if (err) reject(err);
        //       resolve(hash);
        //     });
        //   });

        //   return hashedPassword;
        // };



            var isAdded = await AuthService.addNewuser({ newUser });
            if (isAdded == true) {
              return res
                .status(200)
                .json({ msg: "User Registered/SignUp Successfully" });
            } else if (isAdded == false) {
              return res.status(400).json({ error: "User Not Registered" });
            }
     
    }
  } catch (e) {
    return res
      .status(400)
      .json({ status: 400, message: e.message, msg: "something disturbed" });
  }
};





exports.login = async function (req, res, next) {
  // Validate request parameters, queries using validator npm
  // let { name, email, password, cpassword } = req.body;
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let useremail = req.body.email;
  let userpassword = req.body.password;

  try {
    // var page = req.params.page ? req.params.page : 1;
    // var limit = req.params.limit ? req.params.limit : 1;
    var userscheck = await AuthService.CheckifEmailFind({ useremail });
    if (userscheck) {
      // Check Password
      // bcrypt.compare(password, userpassword).then((isMatch) => {
      //   if (isMatch) {
      //     // User Matched
      //     const payload = { id: userscheck.id, name: userscheck.name }; // Create JWT Payload

      //     // Sign Token
      //     jwt.sign(
      //       payload,
      //       keys.secretOrKey,
      //       { expiresIn: 3600 },
      //       (err, token) => {
      //         res.json({
      //           success: true,
      //           token: "Bearer " + token,
      //         });
      //       }
      //     );
      //   } else {
      //     errors.password = "Password incorrect";
      //     return res.status(400).json(errors);
      //   }
      // });
    } else {
    return res
        .status(200)
        .json({ error: "Email Not Found! Got to Register" });
    }
  } catch (e) {
    return res
      .status(400)
      .json({ status: 400, message: e.message, msg: "something disturbed" });
  }
};
