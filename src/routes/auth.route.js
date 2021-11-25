var express = require("express");
var router = express.Router();

var AuthController = require("../controllers/auth.controller");

  // @route   POST /register/
  // @desc    Register user
router.post("/register", AuthController.register);
 // @route   POST /login/     // All
  // @desc    Read All user
router.post("/login", AuthController.login);


module.exports = router;
