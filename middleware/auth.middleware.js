const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token = req.headers.authorization;

  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, "ok", async (err, decoded) => {
      if (decoded) {
       
        req.body.username = decoded.username
          req.body.UserId = decoded.UserId
        req.body.avatar = decoded.avatar
        next();
      } else {
        res.send({ msg: "please provide a valid token" });
      }
    });
  } else {
    res.send({ msg: "please provide token" });
  }
};

module.exports = {
  auth,
};
