'use strict';

var getErrorHandler = require('../../utils/response_utils').getErrorHandler;

module.exports = function tables(server, sequelize) {
  var model = require('./table_model')(sequelize);

  server.get('/meta/tables', getTables);

  function getTables(request, response, next) {
    model
      .getTables()
      .then(function(data) {
        response.json({tables: data});
        return next();
      })
      .catch(getErrorHandler(response, next));
  }

};