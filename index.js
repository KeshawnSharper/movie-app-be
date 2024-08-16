require('dotenv').config()
const serverless = require('serverless-http')
const createServer = require('./server')
const cors = require("cors")
const corsOptions = {
  credentials: true,
  origin: "*"// Whitelist the domains you want to allow
};

const PORT = process.env.PORT || 5001
const server = createServer()
server.use(cors(corsOptions))

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})

module.exports.handler = serverless(server)