const router = require("express").Router();

const brcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const {
  validateUserPayload,
  checkUniqueUsername,
  checkExistingUser,
} = require("../middleware/auth-middleware");
const Users = require("../users/users-model");

router.post(
  "/register",
  validateUserPayload,
  checkUniqueUsername,
  async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const hash = brcrypt.hashSync(password, 8);
      const user = { username, password: hash };
      const createdUser = await Users.add(user);
      res.status(201).json(createdUser);
    } catch (err) {
      next(err);
    }
    /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
  }
);

router.post(
  "/login",
  validateUserPayload,
  checkExistingUser,
  (req, res, next) => {
    const user = req.body.user;
    const validated = brcrypt.compareSync(req.body.password, user.password);
    if (validated) {
      const token = generateToken(user);
      res.json({ message: `welcome, ${user.username}`, token });
    } else {
      next({ status: 401, message: "invalid credentials" });
    }
    /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
  }
);

module.exports = router;
