'use strict';

var restify = require('restify');

module.exports = {
  getErrorHandler: function getErrorHandler(response, next) {
    return function errorHandler(error) {
      if (error.code === 'MODULE_NOT_FOUND') {
        error = new restify.NotFoundError('Table not found.');
      }
      error.statusCode = error.statusCode || 500;
      response.send(error);
      next(false);
    };
  }
};