'use strict';

var RSVP = require('rsvp');

function getModel(sequelize, name) {
  return new RSVP.Promise(function(resolve) {
    resolve(sequelize.import(__dirname + '/sequelize/' + name));
  });
}

module.exports = {
  generateModels: require('./generate'),
  getModel: getModel
};