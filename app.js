const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const User = require("./src/routes/user.route");
const Auth = require("./src/routes/auth.route");


const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./src/config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  // .then(() => console.log("MongoDB Connected"))
  .then((res) => console.log(`Db connected on ${res.connection.user}`));
// .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./src/config/passport")(passport);

// User Routes , Contain all Crud action inside Routes
app.use("/User", User);
// SignIn SignUp Routes
app.use("/Auth", Auth);


const port = process.env.PORT || 6000;

app.listen(port, () => console.log(`Server running on port ${port}`));
