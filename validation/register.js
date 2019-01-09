const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  console.log("Data provided in req.body: " + data.name);
  /** Validate name parameter */
  /** Check length */
  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Parameter name should be between 2 and 30 characters long";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "Parameter name is required";
  }

  /** Validate email parameter */
  if (!validator.isEmail(data.email)) {
    errors.email = "Parameter email is invalid";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Parameter email is required";
  }

  /** Validate password parameter */
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password =
      "Parameter password SHOULD be between 6 and 30 characters long";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Parameter password is required";
  }
  /** Validate password2 parameter */
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Parameter password2 SHOULD match parameter password";
  }
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Parameter password2 is required";
  }

  return { errors, isValid: isEmpty(errors) };
};
