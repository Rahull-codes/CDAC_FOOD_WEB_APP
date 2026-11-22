const jwt = require("jsonwebtoken");

const config = require("../utils/config");
const result = require("../utils/result");

function authuser(req, res, next) {
  const path = req.path;

  if (path == "/user/signin" || path == "/user/signup" || path == "/food") {
    next();
  } else {
    const token = req.headers.token;
    console.log(token);
    
    if (token) {
      try {
        const payload = jwt.verify(token, config.SECRET);
        // console.log(payload);
        
        req.headers.uid = payload.uid;

        // delete req.headers.token
        next()

      } catch (error) {
        res.send(result.errorResult("token is invalid"));
      }
    } else {
      res.send(result.errorResult("token is missing"));
    }
  }
}

module.exports = authuser
