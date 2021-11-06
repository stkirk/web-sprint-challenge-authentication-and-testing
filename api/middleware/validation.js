// 3- On FAILED registration due to `username` or `password` missing from the request body,
// the response body should include a string exactly as follows: "username and password required".

// 4- On FAILED registration due to the `username` being taken,
// the response body should include a string exactly as follows: "username taken".

const validateUserPayload = (req, res, next) => {
  console.log("validating user payload...");
  next();
};

const checkUniqueUsername = (req, res, next) => {
  console.log("checking for existing user...");
  next();
};

const checkExistingUser = (req, res, next) => {
  console.log("checking if user exists...");
  next();
};

module.exports = {
  validateUserPayload,
  checkExistingUser,
  checkUniqueUsername,
};
