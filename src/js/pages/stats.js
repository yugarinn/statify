const config     = require('./../lib/config.js')
const utils      = require('./../lib/utils.js')
const repository = require('./../lib/repository.js')

const stats = {

    filter: 'long_term',
    type: 'artists',

    init: () => {
        if (utils.getCurrentUrlHashParameter('token_type')) {
            let state = utils.getCurrentUrlHashParameter('state')

            // FIXME: this shouldn't be here
            history.pushState("", document.title, window.location.pathname + window.location.search)

            this.showStatsSection()
            repository.getUserTops()
        }

        this.initAboutModal()
        this.initButtonsFilters()
        this.initButtonsTypes()
    },

    initButtonsFilters: function(tops) {
        let buttons = document.getElementsByClassName('js-button')
        let classRegEx = new RegExp('(^| )selected($| )','g')

        for(let i = 0; i < buttons.length; i++) {
            const self = this
            let button = buttons[i]

            button.addEventListener('click', function() {
                self.filter = this.getAttribute('data-filter')
                self.cleanPage()
                // FIXME
                for (let i = 0; i < buttons.length; i++) {
                    buttons[i].className = buttons[i].className.replace(classRegEx,' ')
                }
                this.className += ' selected'
                repository.getUserTops(self.filter, self.type)
                self.handleTitleListener(self.filter, self.type)
            })
        }
    },

    initButtonsTypes: function() {
        let buttons = document.getElementsByClassName('js-button-type')
        let classRegEx = new RegExp('(^| )selected($| )','g')

        for (let i = 0; i < buttons.length; i++) {
            const self = this
            let button = buttons[i]

            button.addEventListener('click', function() {
                self.type = this.getAttribute('data-type')
                self.cleanPage()
                // FIXME
                for (let i = 0; i < buttons.length; i++) {
                    buttons[i].className = buttons[i].className.replace(classRegEx,' ')
                }

                this.className += ' selected'
                repository.getUserTops(self.filter, self.type)
                self.handleTitleListener(self.filter, self.type)
            })
        }

    },

    handleTitleListener: function(filter, type) {
        let typeSpan = document.querySelector('.js-title-type')
        let filterSpan = document.querySelector('.js-title-filter')

        switch (filter) {
        case 'long_term':
            filterSpan.innerHTML = 'of all time'
            break
        case 'medium_term':
            filterSpan.innerHTML = 'from the last 6 months'
            break
        case 'short_term':
            filterSpan.innerHTML = 'from the last 4 weeks'
        }

        switch (type) {
        case 'artists':
            typeSpan.innerHTML = 'artists'
            break
        case 'tracks':
            typeSpan.innerHTML = 'tracks'
            break
        }
    },

    showStatsSection: function() {
        let section = document.querySelector('.js-stats-container')
        let authButtonContainer = document.querySelector('.js-auth-container')
        let claimContainer = document.querySelector('.js-claim-text')
        let classRegEx = new RegExp('(^| )hidden($| )', 'g')

        authButtonContainer.remove()
        claimContainer.remove()
        section.className = section.className.replace(classRegEx, ' ')
    },

    // FIXME
    cleanPage: function() {
        let container = document.getElementById('topContainer')
        let preloader = document.getElementById('preloader')
        let classRegEx = new RegExp('(^| )selected($| )','g')

        container.innerHTML = ''
        preloader.style.display = 'flex'
    },

    initAboutModal: function() {
        let modalButton = document.querySelector('.js-extra-link')
        let closeModalButton = document.querySelector('.js-modal-close')
        let modal = document.getElementById('modal')

        // TODO: make this smarter for fucks sake
        modalButton.addEventListener('click', function() {
            modal.classList.toggle('open')
        })

        closeModalButton.addEventListener('click', function() {
            modal.classList.toggle('open')
        })
    }
}

module.exports = stats
