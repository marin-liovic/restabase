'use strict';

var ENVIRONMENT = require('../test_environment');
var modelsIndex = require('../../../../src/javascript/models');
var expect = ENVIRONMENT.expect;
var sinon = ENVIRONMENT.sinon;

describe('/models/index', function() {

  describe('getModel', function() {
    var sequelize = {
      import: sinon.spy()
    };
    var name = 'test_name';

    it('should return a promise', function() {
      var promise = modelsIndex.getModel(sequelize, name);
      expect(promise).to.have.property('then').that.is.a('function');
    });

    it('should eventually import a model', function(done) {
      modelsIndex
        .getModel(sequelize, name)
        .then(function() {
          expect(sequelize.import).to.have.been.calledWithMatch(RegExp(/sequelize/ + name));
        })
        .then(done)
        .catch(done);
    });

    });
});
