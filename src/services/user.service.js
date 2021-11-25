var UserSchema = require("../models/user.model");

exports.CheckifUserExistAlready = async function (query) {
  try {
    let mail = query.useremail;
    console.log(query);
    console.log(query);
    const usertest = await UserSchema.find().where("email").equals(mail);

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
   var id = query.userid;
   var o_id = new ObjectId(id);
    const usertest = await UserSchema.find({ _id: o_id });
    console.log("is user is find?", usertest);
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



exports.FindUserById = async function (query) {
  try {
    let id = query.userid;
    console.log(id);
    console.log(id);
    const usertest = await UserSchema.find().where("_id").equals(id);
    // let usertest = await UserSchema.findOne({ mail });
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



exports.addNewuser = async function (query, res) {
   const addUser = new UserSchema({
     email: query.newUser.email,
     password: query.newUser.password,
     title: query.newUser.title,
     firstName: query.newUser.firstName,
     lastName: query.newUser.lastName,
     acceptTerms: query.newUser.acceptTerms,
     domain: query.newUser.domain,
   });
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

    const isuserRead = await UserSchema.find();

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
    var id = query.userid;
    var o_id = new ObjectId(id);
    const isDeleted = await UserSchema.deleteOne({ _id: o_id });
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




exports.UpdateUserRecord = async function (id , query) {
  try {

    console.log(id);
    console.log(query);
    
    var idupdate = id._id;

     let isUpdate = await UserSchema.findOneAndUpdate({ _id: idupdate }, query);
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