const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../../config/secrets");

const generateToken = (user) => {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, TOKEN_SECRET, options);
};

module.exports = generateToken;
