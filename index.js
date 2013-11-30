
/**
 * Module dependencies.
 */

var Emitter = require('emitter');
var typeOf = require('type');
var Input = require('./lib/input');
var Output = require('./lib/output');
var Port = require('./lib/port');

/**
 * Expose `create()`.
 */

exports = module.exports = create;

/**
 * @param {Object} options
 * @return {MIDI}
 */

function create(options) {
  return new MIDI(options);
}

/**
 * Expose constructors.
 */

exports.MIDI = MIDI;
exports.Input = require('./lib/input');
exports.Output = require('./lib/output');
exports.Port = require('./lib/port');
exports.Channel = require('./lib/channel');
exports.Note = require('./lib/note');
exports.messages = require('./lib/messages');

/**
 * @param {Object} options
 */

function MIDI(options) {
  if (!(this instanceof MIDI)) return new MIDI(options);

  this.inputs = [];
  this.outputs = [];

  navigator
    .requestMIDIAccess(options)
    .then(this.onsuccess.bind(this), this.onsuccess.bind(this));
}

/**
 * Mix-in `Emitter`.
 */

Emitter(MIDI.prototype);

/**
 * @param {MIDIAccess} access
 * @param {MIDIOption} options
 */

MIDI.prototype.onsuccess = function(access, options) {
  this.access = access;

  access.onconnect = this.onconnect.bind(this);
  access.ondisconnect = this.ondisconnect.bind(this);

  access.inputs().forEach(function(port) {
    this.inputs.push(new Input(new Port(port)));
  }, this);

  access.outputs().forEach(function(port) {
    this.outputs.push(new Output(new Port(port)));
  }, this);

  return this.emit('ready', this.inputs, this.outputs);
};

/**
 * @param {DOMError} err
 */

MIDI.prototype.onerror = function(err) {
  return this.emit('error', err);
};

/**
 * @param {MIDIConnectionEvent}
 */

MIDI.prototype.onconnect = function(e) {
  // TODO: not implemented?
  return this.emit('connect', e);
};

/**
 * @param {MIDIConnectionEvent}
 */

MIDI.prototype.ondisconnect = function(e) {
  // TODO: not implemented?
  return this.emit('disconnect', e);
};

/**
 * @param {String} type
 * @param {String|RegExp} name (input|output)
 * @return {Input|Output}
 */

MIDI.prototype.find = function(type, name) {
  if ('string' == typeOf(name)) {
    name = new RegExp('^' + name + '/$');
  }

  switch (type) {
    case 'input':
      var devices = this.inputs;
      break;
    case 'output':
      var devices = this.outputs;
      break;
    default:
      throw new TypeError('Invalid type.');
  }

  for (var i = 0, len = devices.length; i < len; ++i) {
    if (devices[i].device.port.name.match(name)) {
      return devices[i];
    }
  }

  return null;
};

/**
 * @param {String|RegExp} name
 * @return {Input}
 */

MIDI.prototype.findInput = function(name) {
  return this.find('input', name);
};

/**
 * @param {String|RegExp} name
 * @return {Output}
 */

MIDI.prototype.findOutput = function(name) {
  return this.find('output', name);
};