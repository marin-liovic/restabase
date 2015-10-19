'use strict';

var getModel = require('../models').getModel;

module.exports = function dataModelCreator(sequelize) {
  return {
    getData: function getData(table) {
      return getModel(sequelize, table)
        .then(function(model) {
          return model.findAll();
        });
    }
  };
};