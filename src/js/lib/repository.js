const config = require('./config.js');
const axios  = require('axios');
const utils  = require('./utils.js');

const repository = {

    authenticate: () => {
        let auth_url = 'https://accounts.spotify.com/authorize?' +
            'client_id=' + config.client_id +
            '&response_type=' + 'token' +
            '&redirect_uri=' + window.location.href +
            '&state=' + Math.random().toString(36).substring(7) +
            '&scope=' + 'user-top-read';

        window.location.replace(auth_url);
    },

    getUserTops: (filter = 'long_term', type = 'artists') => {
        let client = axios.create({
            baseURL: config.base_url,
            timeout: 5000,
            headers: {'Authorization': 'Bearer ' + config.token}
        });

        let params = {
            limit: 50,
            time_range: filter
        };

        client.get(`me/top/${type}`, {params: params})
            .then(function (response) {
                utils.render(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

};

module.exports = repository;
