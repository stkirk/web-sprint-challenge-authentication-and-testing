const db = require("../../data/dbConfig");
// 4- On FAILED registration due to the `username` being taken,
// the response body should include a string exactly as follows: "username taken".

const validateUserPayload = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    next({ status: 422, message: "username and password required" });
  } else next();
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
