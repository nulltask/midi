
/**
 * Module dependencies.
 */

var Emitter = require('emitter');

/**
 * Expose `Port`.
 */

module.exports = Port;

/**
 * slice ref.
 */

var slice = Array.prototype.slice.call;

/**
 * @param {MIDIPort} device
 */

function Port(device) {
  this.device = device;

  for (var i in device) {
    if ('send' === i) continue;
    this[i] = device[i];
  }
}

/**
 * Mix-in `Emitter`.
 */

Emitter(Port.prototype);

/**
 * @param {Uint8Array|Array<Number>} message
 * @param {Number} timestamp [optional]
 */

Port.prototype.send = function(message, timestamp) {
  var args = slice(arguments);

  switch (args.length) {
    case 4:
    case 3:
      message = new Uint8Array([args[0], args[1], args[2]]);
      timestamp = args[3] || window.performance.now();
      break;
    case 2:
    case 1:
      message = new Uint8Array(args[0]);
      timestamp = args[1] || window.performance.now();
      break;
    default:
      throw new TypeError('invalid arguments');
  }

  this.device.send(message, timestamp);

  return this;
};