'use strict';

var _ = require('lodash');
var view = require('./table_view');

module.exports = function tableModelCreator(sequelize) {
  return {
    getTables: function getTables() {
      return sequelize
        .getQueryInterface()
        .showAllTables()
        .then(function(tables) {
          return _.map(tables, view.create);
        });
    }
  };
};