const Mustache = require('mustache');
const pxloader = require('pxloader-browserify');

const utils = {

    loader: new pxloader,

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

    render: function(tops) {
        let container = document.getElementById('topContainer');
        let artists = tops.data.items;
        let html = '';

        for (let i = 0; i < artists.length; i++) {
            let artist = artists[i];
            let template = document.getElementById('artistBoxTemplate').innerHTML;

            Mustache.parse(template);

            let rendered = Mustache.render(template, {
                image: artist.images[0].url,
                name: artist.name,
                uri: artist.external_urls.spotify,
                position: i + 1
            });

            this.addImageToLoader(artist.images[0].url);

            html += rendered;
        }

        this.paint();
        container.insertAdjacentHTML('beforeend', html);
    },

    addImageToLoader: function(image) {
        this.loader.addImage(image);
    },

    showAnimatedImage: function(image, time) {
        const currentImage = image;

        setTimeout(function() {
            currentImage.classList.remove('hidden');
        }, time);
    },

    paint: function() {
        const self = this;

        this.loader.addCompletionListener(function() {
            let images = document.getElementsByClassName('js-animated');
            let preloader = document.getElementById('preloader');
            let time = 0;

            preloader.style.display = 'none';

            for (var i = 0; i < images.length; i++) {
                self.showAnimatedImage(images[i], time);
                time += 50;
            }

        });

        this.loader.start();
    }
};

module.exports = utils;
