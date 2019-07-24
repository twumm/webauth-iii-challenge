const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(logger);
server.use('/api', authRouter);
server.use('/api', usersRouter);

server.get('/', (req, res, next) => {
  try {
    res
      .status(200)
      .send(`<h3>Welcome to jwt user service</h3>`);
  } catch (error) {
      next(new Error('Server not available'));
  }
});

function logger(req, res, next) {
  console.log(
    `[${new Date().toString()}] ${req.method} request from ${req.url}`
  );
  next();
}

function errorHandler(error, req, res) {
  console.log('ERROR', error);
  res
    .status(500)
    .json({
      message: error.message,
      stack: error.stack
    });
}

server.use(errorHandler);

module.exports = server;
