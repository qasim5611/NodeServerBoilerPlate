var ProductSchema = require("../models/product.model");

var UserSchema = require("../models/user.model");


exports.CheckifUserExistAlready = async function (query) {
  try {
    let mail = query.useremail;
    console.log(query);
    console.log(query);
    const usertest = await ProductSchema.find().where("email").equals(mail);

    console.log("is user is find?", usertest);
    let len = usertest.length;
    if (len > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.CheckifIDAvailable = async function (query) {
  try {
    console.log(query);
    console.log(query);
    var ObjectId = require("mongodb").ObjectId;
    var id = query.prodid;
    var o_id = new ObjectId(id);
    const prodtest = await ProductSchema.find({ _id: o_id });
    console.log("is user is find?", prodtest);
    console.log("is user is find?", prodtest);
    let len = prodtest.length;
    if (len > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.FindProductById = async function (query) {
  try {
    let id = query.productid;
    console.log(id);
    console.log(id);
    const prodtest = await ProductSchema.find().where("_id").equals(id);
    // let usertest = await ProductSchema.findOne({ mail });
    console.log("is product is find?", prodtest);
    let len = prodtest.length;
    if (len > 0) {
      return prodtest;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};




exports.getProductByUserid = async function (query) {
  try {
    let id = query.userid;
    console.log(id);
    console.log(id);
    //  const products = await product.find({ userId: req.params.id });

    const prodtest = await ProductSchema.find().where("userid").equals(id);
    // let usertest = await ProductSchema.findOne({ mail });
    console.log("is product is find?", prodtest);
    let len = prodtest.length;
    if (len > 0) {
      return prodtest;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};




exports.AddNewProduct = async function (query, res) {
  const addUser = new ProductSchema(
    query
    // {
    // user: query.newProduct.user,
    // name: query.newProduct.name,
    // brand: query.newProduct.brand,
    // category: query.newProduct.category,
    // imgurl: query.newProduct.imgUrl,
    // color: query.newProduct.color,
    // size: query.newProduct.size,
    // }
  );
  const isAdded = await addUser.save();

  console.log("is user is isAdded?", isAdded);
  console.log("is user is isAdded?", isAdded);

  if (isAdded) {
    return true;
  } else {
    return false;
  }
};

exports.readuser = async function (query, res) {
  const isuserRead = await ProductSchema.find();

  console.log("is user is isuserRead?", isuserRead);
  console.log("is user is isuserRead?", isuserRead);
  if (isuserRead.length > 0) {
    return isuserRead;
  } else {
    return false;
  }
};

exports.DeleteuserById = async function (query) {
  try {
    let id = query.userid;
    console.log(id);
    console.log(id);
    const usertest = await Form.findById(req.body.id);

    console.log("is user is find?", usertest);
    let len = usertest.length;
    if (len > 0) {
      return usertest;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.DeleteNow = async function (query) {
  try {
    console.log(id);
    console.log(id);

    var ObjectId = require("mongodb").ObjectId;
    var id = query.prodid;
    var o_id = new ObjectId(id);
    const isDeleted = await ProductSchema.deleteOne({ _id: o_id });
    console.log("is user is isDeleted?", isDeleted);
    let len = isDeleted.deletedCount;
    if (len > 0) {
      return isDeleted;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.UpdateUserRecord = async function (id, query) {
  try {
    console.log(id);
    console.log(query);

    var idupdate = id._id;

    let isUpdate = await ProductSchema.findOneAndUpdate({ _id: idupdate }, query);
    console.log("is user is isUpdate?", isUpdate);

    if (isUpdate) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
