'use strict';

var dataControllerCreator = require('./data_controller');

module.exports = function data(server, sequelize) {
  var model = require('./data_model')(sequelize);
  var dataController = dataControllerCreator(model);

  server.get('/data/:table', dataController.getData);

};