'use strict';

var initCluster = require('./src/javascript/cluster');
var initWorker = require('./src/javascript/cluster/init_worker');
var argv = require('minimist')(process.argv.slice(2));

if (argv.nocluster) {
  initWorker();
} else {
  initCluster();
}
