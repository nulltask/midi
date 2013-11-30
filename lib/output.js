
/**
 * Module dependencies.
 */

var Emitter = require('emitter');
var Channel = require('./channel');

/**
 * Expose `Output`.
 */

module.exports = Output;

/**
 * @param {Port} port
 */

function Output(port) {
  this.port = port;
  this.channels = {};
}

/**
 * Mix-in `Emitter`.
 */

Emitter(Output.prototype);

/**
 * @param {Number} n
 * @return {Channel}
 */

Output.prototype.channel = function(n) {
  if (this.channels[n]) return this.chanels[n];
  return this.channels[n] = new Channel(this.port, n);
};