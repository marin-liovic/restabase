'use strict';

var ENVIRONMENT = require('../test_environment');
var generate = require('../../../../src/javascript/models/generate');
var expect = ENVIRONMENT.expect;

describe('/models/generate', function() {

  describe('module.exports', function () {

    it('should export a function', function () {
      expect(generate).to.be.a('function');
    });

  });
});