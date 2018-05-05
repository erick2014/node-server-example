var jwt = require('jsonwebtoken')

const { SECRET_PHRASE } = process.env

const generateToken = (data) => {
  return jwt.sign(data, SECRET_PHRASE, { expiresIn: "8h" });
}

const isTokenValid = async function (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_PHRASE, function (err, decoded) {
      if (err) {
        reject({ "valid": false })
      } else {
        resolve({ "valid": true })
      }
    })
  })
}

const tokenValidationMiddleware = async function (req, res, next) {
  let tokenSource = "";
  //if the user is trying to authenticate allow him
  if (req.originalUrl && req.originalUrl === "/user/auth") {
    return next()
  }
  //check if the token was sent by headers
  else if (req.headers.token) {
    tokenSource = req.headers.token
  }
  //check if the token was sent by the url
  else if (req.query && req.query.token) {
    tokenSource = req.query.token;
  }
  else {
    return res.sendStatus(401);
  }

  try {
    let response = await isTokenValid(tokenSource);
    next();
  }
  catch (err) {
    return res.status(401).send({ "error": "invalid token", "data": [], "token": "invalid" })
  }

}

module.exports = {
  "generateToken": generateToken,
  "isTokenValid": isTokenValid,
  "tokenValidationMiddleware": tokenValidationMiddleware
};
