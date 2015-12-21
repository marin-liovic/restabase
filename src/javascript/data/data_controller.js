'use strict';

var getErrorHandler = require('../utils/response_utils').getErrorHandler;

var dataControllerCreator = function dataControllerCreator(model) {
  var dataController = {};

  dataController.getData = function getData(request, response, next) {
    model
      .getData({
        table: request.params.table,
        attributes: parseAttributes(request.query.fields)
      })
      .then(function(data) {
        response.json({data: data});
        return next();
      })
      .catch(getErrorHandler(response, next));
  };

  return dataController;
};

function parseAttributes(toParse) {
  if (toParse) {
    return toParse.split(',');
  }
}

module.exports = dataControllerCreator;