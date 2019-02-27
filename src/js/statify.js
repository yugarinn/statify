const eventManager = require('./lib/EventManager')
const utils = require('./lib/utils')

class Statify {
    constructor() {
        this.store = {
            accessToken: null
        }
    }

    init() {
        this.initUrlListener()
        this.initEventListeners()
    }

    initUrlListener() {
        if (! this.store.accessToken) {
            this.store.accessToken = utils.getCurrentUrlHashParameter('access_token')
            history.pushState("", document.title, window.location.pathname + window.location.search)
            eventManager.trigger('authorized')
        }
    }

    initEventListeners() {
        document.querySelectorAll('[data-event]').forEach(element => {
            element.addEventListener('click', eventManager.get(element.dataset.event))
        })
    }
}

module.exports = new Statify()
