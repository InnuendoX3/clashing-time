const dayRouter = require('../components/day/routes');
const userRouter = require('../components/user/routes');

function allRoutes(server) {
  server.use('/day', dayRouter);
  server.use('/user', userRouter);
}

module.exports = allRoutes;