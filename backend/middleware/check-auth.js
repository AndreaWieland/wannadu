const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, [secret token goes here, this code will not work until you add your own]);
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};
