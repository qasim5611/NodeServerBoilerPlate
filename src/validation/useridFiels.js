const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.id = !isEmpty(data.id) ? data.id : "";




  if (!Validator.isLength(data.id, { min: 2, max: 30 })) {
    errors.id = "id must be between 2 and 30 characters";
  }
 
  if (Validator.isEmpty(data.id)) {
    errors.id = "id field is required";
  }



  return {
    errors,
    isValid: isEmpty(errors)
  };
};
