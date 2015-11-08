'use strict';

var chai = require('chai');
var sinon = require('sinon');
chai.use(require('sinon-chai'));

var ENVIRONMENT = {
  expect: chai.expect,
  sinon: sinon
};

module.exports = ENVIRONMENT;
