
var typeOf = require('type');
var midi = require('midi');
var assert = require('assert');

describe('midi', function() {
  it('should be a function', function() {
    assert('function' === typeOf(midi));
  });
  describe('.MIDI', function() {
    it('shoud be a funciton', function() {
      assert('function' === typeOf(midi.MIDI));
    });
  });
  describe('Port', function() {
    it('should be a function', function() {
      assert('function' === typeOf(midi.Port));
    });
  });
  describe('Channel', function() {
    it('should be a function', function() {
      assert('function' === typeOf(midi.Channel));
    });
  });
  describe('Input', function() {
    it('should be a function', function() {
      assert('function' === typeOf(midi.Input));
    });
  });
  describe('Output', function() {
    it('should be a function', function() {
      assert('function' === typeOf(midi.Output));
    });
  });
  describe('Note', function() {
    it('should be a function', function() {
      assert('function' === typeOf(midi.Note));
    });
  });
});