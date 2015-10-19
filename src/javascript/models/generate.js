'use strict';

var SequelizeAuto = require('sequelize-auto');
var rmdir = require('rimraf');
var DATABASE_CONFIG = require('../../../config/database.json');
var MODELS_PATH = __dirname + '/sequelize';

module.exports = function() {
  var config = {
    dialect: DATABASE_CONFIG.options.dialect,
    host: DATABASE_CONFIG.options.host,
    port: DATABASE_CONFIG.options.port,
    logging: false,
    additional: {
      timestamps: false
    }
  };
  var auto = new SequelizeAuto(DATABASE_CONFIG.schema, DATABASE_CONFIG.username, DATABASE_CONFIG.password, config);

  rmdir(MODELS_PATH, function(error) {
    if (error) {
      throw error;
    }
    auto.run({spaces: true, indentation: 2, directory: MODELS_PATH}, function(error){
      if (error) {
        throw error;
      }
    });
  });
};

