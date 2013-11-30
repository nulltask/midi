
/**
 * Module dependencies.
 */

var Emitter = require('emitter');

/**
 * Expose `Note`.
 */
 
module.exports = Note;

/**
 * @param {Port} port
 * @param {Number} num
 */

function Note(port, num) {
  this.port = port;
  this.num = num;
  this.aliases = {};
}

/**
 * Mix-in `Emitter`.
 */

Emitter(Note.prototype);

/**
 * @param {Number} velocity
 * @param {Number} timestamp [optional]
 */

Note.prototype.noteOff = function(velocity, timestamp) {
  return this.send(0x80 | this.channel, this.num, velocity, timestamp)
};

/**
 * @param {Number} velocity
 * @param {Number} timestamp [optional]
 */


Note.prototype.noteOn = function(velocity, timestamp) {
  return this.send(0x90 | this.channel, this.num, velocity, timestamp)  
};

/**
 * @param {Number} pressure
 * @param {Number} timestamp [optional]
 */

Note.prototype.keyPressure = function(pressure, timestamp) {
  return this.send(0xa0 | this.channel, this.num, pressure, timestamp)
};

/**
 * @param {Uint8Array|Array<Number>} message
 * @param {Number} timestamp [optional]
 */

Note.prototype.send = function(message, timestamp) {
  this.port.send.call(this.port, arguments);
};