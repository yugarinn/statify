const utils      = require('../lib/utils.js');
const repository = require('./../lib/repository.js');

const stats = {
    init: function() {
        if (utils.getHashParameter('token_type')) {
            let state = utils.getHashParameter('state');
            let token = utils.getHashParameter('access_token');

            let tops = repository.getUserTops(token);
        } else {
            repository.authorize();
        }
    },

    paint: function(tops) {
    }
};

module.exports = stats;
