const dayRouter = require('../components/day/routes');

function allRoutes(server) {
  server.use('/day', dayRouter);
}

module.exports = allRoutes;