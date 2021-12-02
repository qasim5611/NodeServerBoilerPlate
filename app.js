const express = require("express");
const axios = require("axios");
const redis = require("redis");
const responseTime = require("response-time");
const { promisify } = require("util");
// const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const User = require("./src/routes/user.route");
const Auth = require("./src/routes/auth.route");
const Product = require("./src/routes/product.route");

const app = express();
app.use(responseTime());
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


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
// product table
app.use("/Product", Product);



const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
});
const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.set).bind(client);

app.get("/rockets", async (req, res, next) => {
  try {
    const reply = await GET_ASYNC("rockets");
    if (reply) {
      console.log("using cached data");
      res.send(JSON.parse(reply));
      return;
    }
    const respone = await axios.get("https://api.spacexdata.com/v3/rockets");
    const saveResult = await SET_ASYNC(
      "rockets",
      JSON.stringify(respone.data),
      "EX",
      50
    );
    console.log("new data cached", saveResult);
    res.send(respone.data);
  } catch (error) {
    res.send(error.message);
  }
});

// app.get('/rockets/:rocket_id', async (req, res, next) => {
//   try {
//     const { rocket_id } = req.params
//     const reply = await GET_ASYNC(rocket_id)
//     if (reply) {
//       console.log('using cached data')
//       res.send(JSON.parse(reply))
//       return
//     }
//     const respone = await axios.get(
//       `https://api.spacexdata.com/v3/rockets/${rocket_id}`
//     )
//     const saveResult = await SET_ASYNC(
//       rocket_id,
//       JSON.stringify(respone.data),
//       'EX',
//       5
//     )
//     console.log('new data cached', saveResult)
//     res.send(respone.data)
//   } catch (error) {
//     res.send(error.message)
//   }
// })

const port = process.env.PORT || 6000;

app.listen(port, () => console.log(`Server running on port ${port}`));