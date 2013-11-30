
/**
 * Module dependencies.
 */

var Emitter = require('emitter');
var Note = require('./note');

/**
 * Expose `Channel`.
 */

module.exports = Channel;

/**
 * @param {Port} port
 * @param {Number} channel
 */

function Channel(port, channel) {
  if (!(this instanceof Channel)) return new Channel(port, channel);
  this.notes = {};
  this.aliases = {};
  this.port = port;
  this.channel = channel;
}

/**
 * Mix-in `Emitter`.
 */

Emitter(Channel.prototype);

/**
 * @param {Number} note
 * @param {Number} velocity
 * @param {Number} timestamp [optional]
 */

Channel.prototype.noteOff = function(note, velocity, timestamp) {
  var n = this.note(note);
  return this.send(0x80 | this.channel, n.num, velocity, timestamp)
};

/**
 * @param {Number} note
 * @param {Number} velocity
 * @param {Number} timestamp [optional]
 */


Channel.prototype.noteOn = function(note, velocity, timestamp) {
  var n = this.note(note);
  return this.send(0x90 | this.channel, n.num, velocity, timestamp)  
};

/**
 * @param {Number} note
 * @param {Number} pressure
 * @param {Number} timestamp [optional]
 */

Channel.prototype.keyPressure = function(note, pressure, timestamp) {
  var n = this.note(note);
  return this.send(0xa0 | this.channel, n.num, pressure, timestamp)
};

/**
 * @param {Number} num
 * @param {Number} val
 * @param {Number} timestamp [optional]
 */

Channel.prototype.controlChange = function(num, val, timestamp) {
  return this.send(0xb0 | this.channel, num, val, timestamp)
};

/**
 * @param {Number} num
 * @param {Number} timestamp [optional]
 */

Channel.prototype.programChange = function(num, timestamp) {
  return this.send(0xc0 | this.channel, num, 0x00, timestamp)
};

/**
 * @param {Number} pressure
 * @param {Number} timestamp [optional]
 */

Channel.prototype.channelPressure = function(pressure, timestamp) {
  return this.send(0xd0 | this.channel, pressure, 0x00, timestamp)
};

/**
 * @param {Number} num
 * @param {Number} val
 * @param {Number} timestamp [optional]
 */

Channel.prototype.pitchBend = function(num, val, timestamp) {
  return this.send(0xe0 | this.channel, num, val, timestamp)
};

/**
 * @param {Number} note
 * @param {String} name
 */

Channel.prototype.register = function(note, name) {
  this.aliases[note] = name;
  return this;
};

/**
 * @param {Uint8Array|Array} message
 * @param {Number} timestamp
 */

Channel.prototype.send = function(message, timestamp) {
  this.port.send.call(this.port, arguments);
};

/**
 * @param {Number} n
 * @return {Note}
 */
 
Channel.prototype.note = function(n) {
  if (this.notes[n]) return this.notes[n];
  return this.notes[n] = new Note(this.port, n);
};