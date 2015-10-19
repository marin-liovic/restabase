'use strict';

var getErrorHandler = require('../utils/response_utils').getErrorHandler;

module.exports = function data(server, sequelize) {
  var model = require('./data_model')(sequelize);

  server.get('/data/:table', getData);

  function getData(request, response, next) {
    model
      .getData(request.params.table)
      .then(function(data) {
        response.json({data: data});
        return next();
      })
      .catch(getErrorHandler(response, next));
  }

};