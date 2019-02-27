const config     = require('./lib/config.js');
const repository = require('./lib/repository');
const utils      = require('./lib/utils.js');
const stats      = require('./pages/stats.js');

config.token === undefined ? config.token = utils.getHashParameter('access_token') : config.token = config.token;

stats.init();
