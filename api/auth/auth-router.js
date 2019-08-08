const router = require('express').Router();

const Users = require('../users/users-model');
const { hashPassword, reversePasswordHash, generateToken } = require('../middlewares/auth-middleware');
const { validateUserData } = require('../middlewares/user-middleware');

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

router.post('/login', [validateUserData, reversePasswordHash], async (req, res, next) => {
  try {
    if (req.user) {
      const token = await generateToken(req.user);
      
      res
        .status(200)
        .json({
          user: {
            id: req.user.id,
            username: req.user.username,
            department: req.user.department,
          },
          token
        });
    } else {
      next(new Error("You are not authorised"));
    }
  } catch (error) {
    next(new Error('Login failed miserably. Kindly try again'));
  }
});

module.exports = router;
