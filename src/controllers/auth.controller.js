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

          const salt = await bcrypt.genSalt(10);
          newUser.password = await bcrypt.hash(newUser.password, salt);

          console.log( 'bycrypt pass' , newUser.password);
          console.log(newUser.password);


            var isAdded = await AuthService.AddNewuser({ newUser });
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
          const userscheck = await AuthService.CheckifEmailFind({ useremail });
          console.log("userscheck", userscheck);   
          
          if (!userscheck){
              return res
                .status(200)
                .json({ error: "Email Not Found! Got to Register" });
          }


           let dbPass = userscheck[0].password;
           // Check Password
           let isMatch = await bcrypt.compare(userpassword, dbPass);
           //  bcrypt.compare(userpassword, dbpassword);
           if (isMatch) {
             // User Matched
             const payload = {
               id: userscheck[0].id,
               name: userscheck[0].name,
             }; // Create JWT Payload

             // Sign Token
             jwt.sign(
               payload,
               keys.secretOrKey,
               { expiresIn: 3600 },
               (err, token) => {
                 res.json({
                   success: true,
                   token: "Bearer " + token,
                 });
               }
             );
           } else {
             errors.password = "Password incorrect";
             return res.status(400).json(errors);
           }
            // if (userscheck == true) {
            //   let dbPass = userscheck[0].password;
            //   // Check Password
            //   let isMatch = await bcrypt.compare(userpassword, dbPass);
            //   //  bcrypt.compare(userpassword, dbpassword);
            //   if (isMatch) {
            //     // User Matched
            //     const payload = {
            //       id: userscheck[0].id,
            //       name: userscheck[0].name,
            //     }; // Create JWT Payload

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
            // } else if (userscheck == false) {
            //   return res
            //     .status(200)
            //     .json({ error: "Email Not Found! Got to Register" });
            // }
  } catch (e) {
    return res
      .status(400)
      .json({ status: 400, message: e.message, msg: "something disturbed" });
  }
};
