const config = require('./config.js');
const axios  = require('axios');
const utils  = require('./utils.js');

const repository = {

    authorize: function() {
        let auth_url = 'https://accounts.spotify.com/authorize?' +
            'client_id=' + config.client_id +
            '&response_type=' + 'token' +
            '&redirect_uri=' + window.location.href +
            '&state=' + Math.random().toString(36).substring(7) +
            '&scope=' + 'user-top-read';

        window.location.replace(auth_url);
    },

    getUserTops: function(token) {
        let client = axios.create({
            baseURL: config.base_url,
            timeout: 5000,
            headers: {'Authorization': 'Bearer ' + token}
        });

        let params = {
            limit: 50,
            time_range: 'long_term'
        };

        client.get('me/top/artists', {params: params})
            .then(function (response) {
                utils.render(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

};

module.exports = repository;
