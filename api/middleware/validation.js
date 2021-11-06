const validateUserPayload = (req, res, next) => {
  console.log("validating user payload...");
  next();
};

const checkUniqueUsername = (req, res, next) => {
  console.log("checking for existing user...");
  next();
};

const checkExistingUser = (req, res, next) => {
  console.log("checking if user exists");
  next();
};

module.exports = {
  validateUserPayload,
  checkExistingUser,
  checkUniqueUsername,
};
