var express = require("express");
var router = express.Router();
const passport = require("passport");

var UserController = require("../controllers/user.controller");

  // @route   POST /Saveusers/
  // @desc    Register user
  // @access  Public
router.post("/adduser", UserController.adduser);
 // @route   GET /readuser/     // All
  // @desc    Read All user
  // @access  Punblic
router.post("/readuser", UserController.readuser);
 // @route   GET /readuser/     // All
  // @desc    Read Specific user
  // @access  Public
router.get("/readuserByid", UserController.readuserByid);

 // @route   POST /deleteuser/
  // @desc    Delete user
  // @access  Public
router.post("/deleteuserByid", UserController.deleteuserByid);
 // @route   POST /updateuser/
  // @desc    Register user
  // @access  Public    // Because Login logut is not added yet
router.post("/updateuserByid", UserController.updateuserByid);


module.exports = router;
