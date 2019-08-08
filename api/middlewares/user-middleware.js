function validateUserData(req, res, next) {
  if (req.body.constructor === Object && Object.keys(req.body).length <= 0) {
    res
      .status(400)
      .json({ message: 'User data is missing' });
  } else if (!req.body.username || !req.body.password) {
    res
      .status(400)
      .json({ message: 'Missing required *username* and *password* fields' })
  } else {
    next();
  }
}

module.exports = {
  validateUserData,
};
