'use strict';

var cluster = require('cluster');
var initMaster = require('./init_master');
var initWorker = require('./init_worker');

module.exports = function initCluster() {
  if (cluster.isMaster) {
    initMaster();
  } else {
    initWorker();
  }
};