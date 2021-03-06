'use strict';

var restify = require('restify');
var Sequelize = require('sequelize');
var tablesMeta = require('../meta/tables');
var data = require('../data');
var generateModels = require('../models').generateModels;
var SERVER_CONFIG = require('../../../config/server.json');
var DATABASE_CONFIG = require('../../../config/database.json');

module.exports = function initWorker() {
  //init server
  var server = restify.createServer({name: 'restabase'});

  //init sequelize
  var sequelize = new Sequelize(
    DATABASE_CONFIG.schema,
    DATABASE_CONFIG.username,
    DATABASE_CONFIG.password,
    DATABASE_CONFIG.options
  );

  server.use(restify.queryParser());

  //init modules
  tablesMeta(server, sequelize);
  data(server, sequelize);

  //init models
  generateModels();

  server.listen(SERVER_CONFIG.port, function() {
    console.log('%s listening at %s', server.name, server.url);
  });

};