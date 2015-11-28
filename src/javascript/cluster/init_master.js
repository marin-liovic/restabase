'use strict';

var cluster = require('cluster');
var nWorkers = require('os').cpus().length;

module.exports = function initMaster() {

  for (var i = 0; i < nWorkers; i++) {
    cluster.fork();
  }

  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.id + ' (pid: ' + worker.process.pid + ') is online.');
  });

  cluster.on('exit', function(worker, code, signal) {
    console.log('Worker ' + worker.id + ' (pid: ' + worker.process.pid +
      ') died with code ' + code + ' and signal ' + signal);
  });

};