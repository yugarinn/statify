const Mustache = require('mustache');

const utils = {
    getHashParameter: function(parameter) {
        let result = null;
        let tmp    = [];

        location.hash
            .substr(1)
            .split("&")
            .forEach(function (item) {
                tmp = item.split("=");
                if (tmp[0] === parameter) result = decodeURIComponent(tmp[1]);
            });

        return result;
    },

    paint: function(tops) {
        let artists = tops.data.items;

        for (let i = 0; i < artists.length; i++) {
            let artist      = artists[i];
            console.log(artist);
            let container   = document.getElementById('topContainer');
            let template    = document.getElementById('artistBoxTemplate').innerHTML;

            Mustache.parse(template);

            let rendered = Mustache.render(template, {
                image: artist.images[0].url,
                name: artist.name,
                uri: artist.external_urls.spotify,
                position: i + 1
            });

            container.insertAdjacentHTML('beforeend', rendered);
        }
    }
};

module.exports = utils;
