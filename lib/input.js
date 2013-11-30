
/**
 * Module dependencies.
 */

var Emitter = require('emitter');
var Channel = require('./channel');
var messages = require('./messages');

/**
 * Expose `Input`
 */

module.exports = Input;

/**
 * @param {Port} port
 */

function Input(port) {
  this.port = port;
  this.channels = {};

  port.onconnect = this.onconnect.bind(this);
  port.onmidimessage = this.onmidimessage.bind(this);
  port.ondisconnect = this.ondisconnect.bind(this);
}

/**
 * Mix-in `Emitter`.
 */

Emitter(Input.prototype);

/**
 * @param {MIDIMessageEvent} e
 */

Input.prototype.onmidimessage = function(e) {
  if (0x80 <= e.data[0] && e.data[0] <= 0xef) {
    // channel voice message
    var m = e.data[0] & 0xf0;
    var c = e.data[0] & 0x0f;
    var channel = this.channel(c);
    var message = messages[m];

    channel.emit(message, c, e.data[1], e.data[2]);

    if (channel.aliases[e.data[1]]) {
      channel.emit(message + ':' + channel.map[e.data[1]], e.data[2]);
    }
  }

  this.emit('message', e);
};

/**
 * @param {MIDIConnectionEvent} e
 */

Input.prototype.onconnect = function(e) {
  return this.emit('connect', e);
};

/**
 * @oaram {MIDIConnectionEvent} e
 */

Input.prototype.ondisconnect = function(e) {
  return this.emit('disconnect', e);
};

/**
 * @param {Number} n
 * @return {Channel}
 */

Input.prototype.channel = function(n) {
  if (this.channels[n]) return this.channels[n];
  return this.channels[n] = new Channel(this.port, n);
};