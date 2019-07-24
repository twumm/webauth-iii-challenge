const router = require('express').Router();

const Users = require('./users-model.js');

router.get('/users', async (req, res, next) => {
  try {
    const users = await Users.getAllUsers();
    res
      .status(200)
      .json(users);
  } catch (error) {
    next(new Error('Could not get users.'));
  }
});

module.exports = router;
