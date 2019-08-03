const EventEmmiter = require('events');

class Emmiter extends EventEmmiter {}

const event = new Emmiter;

module.exports = event;