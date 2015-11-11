'use strict';

var ENVIRONMENT = require('../../test_environment');
var tablesIndex = require('../../../../../src/javascript/meta/tables');
var expect = ENVIRONMENT.expect;
var sinon = ENVIRONMENT.sinon;

describe('/models/tables/index', function() {

  describe('module.exports', function () {
    var server = {
      get: sinon.spy()
    };

    it('should export a function', function ()  {
      expect(tablesIndex).to.be.a('function');
    });

    it('should map route to GET /meta/tables', function ()  {
      tablesIndex(server, {});
      expect(server.get).to.have.been.calledWith('/meta/tables');
    });

  });
});