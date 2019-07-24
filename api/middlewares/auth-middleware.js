const bcrypt = require('bcrypt');

const User = require('../users/users-model');

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

module.exports = {
  hashPassword,
  reversePasswordHash,
};
