const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.title = !isEmpty(data.title) ? data.title : "";
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.domain = !isEmpty(data.domain) ? data.domain : "";



  if (!Validator.isLength(data.title, { min: 2, max: 30 })) {
    errors.title = "Title must be between 2 and 30 characters";
  }
 if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
   errors.firstName = "firstName must be between 2 and 30 characters";
 }
   if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
     errors.lastName = "lastName must be between 2 and 30 characters";
   }
    if (!Validator.isLength(data.domain, { min: 2, max: 30 })) {
      errors.domain = "domain must be between 2 and 30 characters";
    }

    if (!Validator.isURL(data.domain, { allow_protocol_relative_urls: true })) {
      errors.domain = "Domain Url is Invalid!";
    }
      if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
      }
        if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }


  if (Validator.isEmpty(data.title)) {
    errors.title = "title field is required";
  }
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "firstName field is required";
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "lastName field is required";
  }
  if (Validator.isEmpty(data.domain)) {
    errors.domain = "domain field is required";
  }
  
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }



  // if (!Validator.equals(data.password, data.password2)) {
  //   errors.password2 = 'Passwords must match';
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
