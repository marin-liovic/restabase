'use strict';

var ENVIRONMENT = require('../test_environment');
var responseUtils = require('../../../../src/javascript/utils/response_utils');
var expect = ENVIRONMENT.expect;
var sinon = ENVIRONMENT.sinon;

describe('response_utils', function() {

  describe('getErrorHandler', function() {
    var response = {
      send: sinon.spy()
    };
    var next = sinon.spy();

    it('should return a function', function() {
      var handler = responseUtils.getErrorHandler(response, next);
      expect(handler).to.be.a('function');
    });

    it('should return an error handler that defaults to 500 - Internal Server Error', function() {
      var handler = responseUtils.getErrorHandler(response, next);
      var error = {};
      handler(error);
      expect(error).to.have.property('statusCode').and.to.equal(500);
    });

    it('should return an error handler that sends error response', function() {
      var handler = responseUtils.getErrorHandler(response, next);
      var error = {};
      handler(error);
      expect(response.send).to.have.been.calledWith(error);
      expect(next).to.have.been.calledWith(false);
    });

    it('should return an error handler that calls functions response.send() and next() only once', function() {
      var response = {
        send: sinon.spy()
      };
      var next = sinon.spy();
      var handler = responseUtils.getErrorHandler(response, next);
      var error = {};
      handler(error);
      expect(response.send).to.have.been.calledOnce;
      expect(next).to.have.been.calledOnce;
    });

    it('should return an error handler that returns 404 if model does not exist', function() {
      var handler = responseUtils.getErrorHandler(response, next);
      var error = {code: 'MODULE_NOT_FOUND'};
      handler(error);
      expect(response.send).to.have.been.calledWithMatch({statusCode: 404});
    });

  });

});