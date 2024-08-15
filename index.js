require('dotenv').config()
const serverless = require('serverless-http')
const createServer = require('./server')

const PORT = process.env.PORT || 5001
const server = createServer();
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})

module.exports.handler = serverless(server)