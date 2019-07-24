const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res, next) => {
  try {
    res
      .status(200)
      .send(`<h3>Welcome to jwt user service</h3>`);
  } catch (error) {
      next(new Error('Server not available'));
  }
});

module.exports = server;
