const Mustache = require('mustache');
const pxloader = require('pxloader-browserify');

const utils = {

    loader: new pxloader,

    getCurrentUrlHashParameter: function(parameter) {
        let result = null;
        let tmp    = [];

        console.log(location.hash);

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
        const items = tops.data.items;

        items[0].type == 'artist' ? this.renderArtists(items) : this.renderTracks(items);
    },

    renderArtists: function(artists) {
        console.log('rendering artists...');
        const container = document.getElementById('topContainer');
        const template = document.getElementById('artistBoxTemplate').innerHTML;
        let html = '';

        for (let i = 0; i < artists.length; i++) {
            let artist = artists[i];
            let image = artist.images[0];
            let image_url = '';

            image == undefined ? image_url = 'http://lorempixel.com/400/200' : image_url = image.url;

            Mustache.parse(template);

            let rendered = Mustache.render(template, {
                image: image_url,
                name: artist.name,
                uri: artist.external_urls.spotify,
                position: i + 1
            });

            this.addImageToLoader(image_url);

            html += rendered;
        }

        this.paint();
        container.insertAdjacentHTML('beforeend', html);
    },

    renderTracks: function(tracks) {
        console.log('rendering tracks...');
        const container = document.getElementById('topContainer');
        const template = document.getElementById('tracksBoxTemplate').innerHTML;
        let html = '';

        for (let i = 0; i < tracks.length; i++) {
            let track = tracks[i];
            let image = track.album.images[0];
            let image_url = '';

            image == undefined ? image_url = 'http://lorempixel.com/400/200' : image_url = image.url;

            Mustache.parse(template);

            let rendered = Mustache.render(template, {
                image: image_url,
                name: track.name,
                artist: track.artists[0].name,
                uri: track.external_urls.spotify,
                position: i + 1
            });

            this.addImageToLoader(image_url);

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
