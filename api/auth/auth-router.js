const router = require('express').Router();
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model');
const { hashPassword, reversePasswordHash } = require('../middlewares/auth-middleware');
const { validateUserData } = require('../middlewares/user-middleware');
const secret = 'some long and safe secret';

router.post('/register', [validateUserData, hashPassword], async (req, res, next) => {
  const { username, department } = req.body;
  const { hashedPassword } = req;
  const user = {
    username,
    department,
    password: hashedPassword
  };

  try {
    const newUser = await Users.addUser(user);
    res
      .status(201)
      .json(newUser)
  } catch (error) {
    next(new Error('Could not register user. Please try again.'));
  }
});

module.exports = router;
