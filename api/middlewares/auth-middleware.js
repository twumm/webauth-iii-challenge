const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../users/users-model');
const { jwtSecret } = require('../config/secret');

async function hashPassword(req, res, next) {
  const { password } = req.body;
  try {
    const hashedPassword = await bcrypt.hashSync(password, 12);
    req.hashedPassword = hashedPassword;
    next();
  } catch (error) {
    next(new Error('Something went wrong. Please try again.'));
  }
}

async function reversePasswordHash(req, res, next) {
  const { username, password } = req.body;
  try {
    User.findBy({username})
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          req.user = user;
          next();
        } else {
          res.status(401).json({ message: 'Invalid credentials '});
        }
      });
  } catch (error) {
    next(new Error('Something went wrong. Please try again'));
  }
}

function generateToken(user) {
  const payload = {
    sub: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, jwtSecret, options);
}

function restricted(req, res, next) {
  const tokenInAuthHeader = req.headers.authorization;

  if (tokenInAuthHeader) {
    jwt.verify(tokenInAuthHeader, jwtSecret, (error, decodedToken) => {
      if (error) {
        res
          .status(401)
          .json({ message: "You shall not pass" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  }
}

module.exports = {
  hashPassword,
  reversePasswordHash,
  generateToken,
  restricted,
};
