'use strict';

var restify = require('restify');

function convertToRestifyError(error) {
  if (error.code === 'MODULE_NOT_FOUND') {
    error = restify.codeToHttpError(404, 'Table not found.');
  }
  if (error.original && error.original.code === 'ER_BAD_FIELD_ERROR') {
    error = restify.codeToHttpError(400, error.message);
  }
  return error;
}

module.exports = {
  getErrorHandler: function getErrorHandler(response, next) {
    return function errorHandler(error) {
      error = convertToRestifyError(error);
      error.statusCode = error.statusCode || 500;
      error = restify.codeToHttpError(error.statusCode, error.message || 'Internal Server Error');
      response.send(error);
      next(false);
    };
  }
};