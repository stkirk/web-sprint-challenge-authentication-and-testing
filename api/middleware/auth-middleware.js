const Users = require("../users/users-model");

const validateUserPayload = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    next({ status: 422, message: "username and password required" });
  } else next();
};

const checkUniqueUsername = async (req, res, next) => {
  try {
    const existing = await Users.findBy({ username: req.body.username });
    if (existing[0]) {
      next({ status: 422, message: "username taken" });
    } else next();
  } catch (err) {
    next(err);
  }
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
