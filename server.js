const express = require('express');

const dataRouter = require('./router/data-router');

const cors = require('cors');

// server.use(helmet());
// server.use(express.json());
// server.use(cors());
// server.use('/', dataRouter);
function createServer() {
    const helmet = require('helmet');
    const server = express();
    server.use(helmet());
    server.use(express.json());
    server.use(cors());
    server.use('/', dataRouter);
    return server;
  }

module.exports = createServer;
