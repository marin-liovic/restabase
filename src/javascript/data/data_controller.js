'use strict';

var RSVP = require('rsvp');
var _ = require('lodash');
var getErrorHandler = require('../utils/response_utils').getErrorHandler;
var ATTRIBUTES_QUERY_PARAM = 'fields';
var OFFSET_QUERY_PARAM = 'offset';
var LIMIT_QUERY_PARAM = 'limit';
var OPERATORS = ['$gt', '$gte', '$lt', '$lte', '$ne', '$like', '$notLike'];

var dataControllerCreator = function dataControllerCreator(model) {
  var dataController = {};

  dataController.getData = function getData(request, response, next) {
    getOptions(request)
      .then(function (options) {
        return model.getData(options);
      })
      .then(function(data) {
        response.json({data: data});
        return next();
      })
      .catch(getErrorHandler(response, next));
  };

  return dataController;
};

function getOptions(request) {
  return new RSVP.Promise(function (resolve) {
    resolve({
        table: request.params.table,
        attributes: parseAttributes(request.query[ATTRIBUTES_QUERY_PARAM]),
        where: parseWhere(request.query),
        pagination: parsePagination(request.query)
      });
  });
}

function parseAttributes(toParse) {
  if (toParse) {
    return toParse.split(',');
  }
}

function parseWhere(toParse) {
  var where = _.clone(toParse);
  delete where[ATTRIBUTES_QUERY_PARAM];
  delete where[LIMIT_QUERY_PARAM];
  delete where[OFFSET_QUERY_PARAM];
  processOperators(where);
  return where;
}

function processOperators(where) {
  _.forOwn(where, function(value, key) {
    var parts = key.split('$');
    if (parts.length > 1) {
      var newKey = parts[0];
      var operator = '$' + parts[1];
      validateOperator(operator);
      where[newKey] = {};
      where[newKey][operator] = value;
      delete where[key];
    }
  });
  return where;
}

function validateOperator(operator) {
  if (!_.contains(OPERATORS, operator)) {
    throw {
      statusCode: 400,
      message: 'Bad value for operator: ' + operator + '. Supported values: ' + OPERATORS.join(',')
    };
  }
}

function parsePagination(toParse) {
  return {
    offset: parseInt(toParse[OFFSET_QUERY_PARAM], 10),
    limit: parseInt(toParse[LIMIT_QUERY_PARAM], 10)
  };
}

module.exports = dataControllerCreator;