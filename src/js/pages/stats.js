const config     = require('./../lib/config.js');
const utils      = require('./../lib/utils.js');
const repository = require('./../lib/repository.js');

const stats = {
    init: function() {
        if (utils.getHashParameter('token_type')) {
            let state = utils.getHashParameter('state');

            // FIXME: this shouldn't be here
            history.pushState("", document.title, window.location.pathname + window.location.search);

            this.showStatsSection();
            repository.getUserTops();
        } else {
            this.initAuthButton();
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

                self.cleanPage();
                this.className += ' selected';
                repository.getUserTops(filter);
            });
        }
    },

    initAuthButton: function() {
        let button = document.getElementById('authButton');

        button.addEventListener('click', function() {
            repository.authorize();
        });
    },

    showStatsSection: function() {
        let section = document.getElementsByClassName('js-stats-container');
        let authButtonContainer = document.getElementsByClassName('js-auth-container');
        let classRegEx = new RegExp('(^| )hidden($| )', 'g');

        authButtonContainer[0].remove();
        section[0].className = section[0].className.replace(classRegEx, ' ');
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
