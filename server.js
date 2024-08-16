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
    app.use(function(req, res, next) {
      // res.header("Access-Control-Allow-Origin", "*");
      const allowedOrigins = ['http://localhost:3000', 'https://movie-application-bxf3.vercel.app/', 'https://gamebrag.onrender.com'];
      const origin = req.headers.origin;
      if (allowedOrigins.includes(origin)) {
           res.setHeader('Access-Control-Allow-Origin', origin);
      }
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      res.header("Access-Control-Allow-credentials", true);
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
      next();
    });
    server.use('/login',loginRouter);
    server.use('/users',userRouter);
    server.use('/register',registerRouter);
    server.use('/savedMovies',movieRouter);
    return server;
  }

module.exports = createServer
