const express = require('express');


// const routes = require("./router/route-config")

const cors = require('cors');
let loginRouter = require('./router/authRouters/login-router')
let registerRouter = require('./router/authRouters/register-router')
let userRouter = require('./router/user-router')
let movieRouter = require('./router/movie-router')
// server.use(helmet());
// server.use(express.json())
// server.use(cors());
// server.use('/', dataRouter);
function createServer() {
 
  
    const helmet = require('helmet');
    const server = express();
    server.use(helmet());
    server.use(express.json());
    server.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      next();
    });
    server.set({'Access-Control-Allow-Origin': '*'})
    server.use(cors());
    server.use('/login',loginRouter);
    server.use('/users',userRouter);
    server.use('/register',registerRouter);
    server.use('/savedMovies',movieRouter);
    return server;
  }

module.exports = createServer;
