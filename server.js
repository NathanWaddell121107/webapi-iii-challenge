const express = require('express');
const port = 8000;
const server = express();
const UserRouter = require('./users/userRouter');

server.use(express.json());

server.use('/api/users', UserRouter)

// custom Middleware
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware
function logger(req, res, next) {
  console.log(`${new Date().toISOString()}`)
  console.log(`${req.method}`)
  console.log(`${req.url}`)
  next();
};

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

module.exports = server;
