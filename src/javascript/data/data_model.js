'use strict';

var getModel = require('../models').getModel;

module.exports = function dataModelCreator(sequelize) {
  return {
    getData: function getData(options) {
      return getModel(sequelize, options.table)
        .then(function(model) {
          return model.findAll({
            attributes: options.attributes,
            where: options.where,
            limit: options.pagination.limit,
            offset: options.pagination.offset
          });
        });
    }
  };
};