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

        // TODO
        for (let i = 0; i < artists.length; i++) {
            let artist = artists[i];
            let image = document.createElement("img");
            console.log(artist);

            image.setAttribute('src', artist.images[0].url);
            image.setAttribute('width', 300);
            image.setAttribute('height', 300);
            image.setAttribute('alt', artist.name);

            document.getElementById('app').appendChild(image);
        }
    }
};

module.exports = utils;
