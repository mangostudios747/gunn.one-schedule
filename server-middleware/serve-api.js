const port = 3001
const express = require('express');
const app = require('./auth');
const server = express();
server.use('/api', app)

server.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}/api`)
})
