const express = require('express');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

// const routes = require("./router/route-config")

const cors = require('cors');
const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:80'] // Whitelist the domains you want to allow
};
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
    server.use(cors(corsOptions));
    server.use(helmet());
    server.use(express.json());
    // res.setHeader('Access-Control-Allow-Credentials', true)
    // res.setHeader('Access-Control-Allow-Origin', '*')
    // // another common pattern
    // // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    // server.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    // res.setHeader(
    //   'Access-Control-Allow-Headers',
    //   'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    // )
    server.use('/login',loginRouter);
    server.use('/users',userRouter);
    server.use('/register',registerRouter);
    server.use('/savedMovies',movieRouter);
    return server;
  }

module.exports = createServer
