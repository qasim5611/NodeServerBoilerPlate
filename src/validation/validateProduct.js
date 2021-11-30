const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.brand = !isEmpty(data.brand) ? data.brand : "";
  data.category = !isEmpty(data.category) ? data.category : "";
  data.imgurl = !isEmpty(data.imgurl) ? data.imgurl : "";
  data.color = !isEmpty(data.color) ? data.color : "";
  data.size = !isEmpty(data.size) ? data.size : "";

  if (!Validator.isLength(data.category, { min: 2, max: 30 })) {
    errors.category = "category must be between 2 and 30 characters";
  }
  if (!Validator.isLength(data.imgurl, { min: 2, max: 200 })) {
    errors.imgurl = "imgurl must be between 2 and 200 characters";
  }
  if (!Validator.isLength(data.color, { min: 2, max: 30 })) {
    errors.color = "color must be between 2 and 30 characters";
  }
  if (!Validator.isLength(data.size, { min: 2, max: 30 })) {
    errors.size = "size must be between 2 and 30 characters";
  }

  // if (!Validator.isURL(data.size, { allow_protocol_relative_urls: true })) {
  //   errors.size = "size Url is Invalid!";
  // }
  if (!Validator.isLength(data.brand, { min: 4, max: 30 })) {
    errors.brand = "brand must be at least 4 characters";
  }


  if (Validator.isEmpty(data.category)) {
    errors.category = "category field is required";
  }
  if (Validator.isEmpty(data.imgurl)) {
    errors.imgurl = "imgurl field is required";
  }
  if (Validator.isEmpty(data.color)) {
    errors.color = "color field is required";
  }
  if (Validator.isEmpty(data.size)) {
    errors.size = "size field is required";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "name field is required";
  }


  if (Validator.isEmpty(data.brand)) {
    errors.brand = "brand field is required";
  }

  // if (!Validator.equals(data.brand, data.brand2)) {
  //   errors.brand2 = 'brands must match';
  // }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
