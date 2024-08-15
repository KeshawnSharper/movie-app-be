const express = require('express');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

// const routes = require("./router/route-config")

const cors = require('cors');
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
let loginRouter = require('./router/authRouters/login-router')
let registerRouter = require('./router/authRouters/register-router')
let userRouter = require('./router/user-router')
let movieRouter = require('./router/movie-router')
// server.use(helmet());
// server.use(express.json())
// server.use(cors());
// server.use('/', dataRouter);
function createServer() {
 
  
    const helmet = require('helmet')
    const server = express();
    server.use(helmet());
    server.use(express.json());
    server.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header("Access-Control-Allow-Methods", "POST, GET, PUT");
      next();
    });
    server.set({'Access-Control-Allow-Origin': '*'})
    server.use(cors(corsOptions));
    server.use('/login',loginRouter);
    server.use('/users',userRouter);
    server.use('/register',registerRouter);
    server.use('/savedMovies',movieRouter);
    return server;
  }

module.exports = createServer
