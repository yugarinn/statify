const utils      = require('../lib/utils.js');
const repository = require('./../lib/repository.js');

const stats = {
    init: function() {
        if (utils.getHashParameter('token_type')) {
            let state = utils.getHashParameter('state');
            let token = utils.getHashParameter('access_token');

            repository.getUserTops(token);
        } else {
            repository.authorize();
        }

        this.initButtonsFilters();
    },

    initButtonsFilters: function(tops) {
        let buttons = document.getElementsByClassName('js-button');
        let classRegEx = new RegExp('(^| )selected($| )','g');

        for(let i = 0; i < buttons.length; i++) {
            const self = this;
            let button = buttons[i];

            button.addEventListener('click', function() {
                let filter = this.getAttribute('data-filter');
                let token = utils.getHashParameter('access_token');

                self.cleanPage();
                this.className += ' selected';
                repository.getUserTops(token, filter);
            });
        }
    },

    // FIXME
    cleanPage: function() {
        let container = document.getElementById('topContainer');
        let preloader = document.getElementById('preloader');
        let buttons = document.getElementsByClassName('js-button');
        let classRegEx = new RegExp('(^| )selected($| )','g');

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].className = buttons[i].className.replace(classRegEx,' ');
        }

        container.innerHTML = '';
        preloader.style.display = 'flex';
    }
};

module.exports = stats;
