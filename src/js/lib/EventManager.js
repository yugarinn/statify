const repository = require('./repository');

class EventManager {
    constructor() {
        this.events = {
            authorize: repository.authenticate,
            authorized: () => { console.log('olrait') }
        }
    }

    get(event) {
        return this.events[event]
    }

    trigger(event) {
        this.events[event]();
    }
}

module.exports = new EventManager
