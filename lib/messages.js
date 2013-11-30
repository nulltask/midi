
/**
 * MIDI messages.
 */

module.exports = {
  0x80: 'noteOff',
  0x90: 'noteOn',
  0xa0: 'keyPressure',
  0xb0: 'controlChange',
  0xc0: 'programChange',
  0xd0: 'channelPressure',
  0xe0: 'pitchBend',
  0x78: 'allSoundOff',
  0x79: 'resetAllController',
  0x7a: 'localControl',
  0x7b: 'allNoteOff',
  0x7c: 'omniOn',
  0x7d: 'omniOff',
  0x7e: 'monoMode',
  0x7f: 'polyMode',
  0xf0: 'exclusive',
  0xf1: 'timecode',
  0xf2: 'songPositionPointer',
  0xf3: 'songSelect',
  0xf6: 'tuneRequest',
  0xf7: 'endOfExclusive',
  0xf8: 'clock',
  0xfa: 'start',
  0xfb: 'continue',
  0xec: 'stop',
  0xfe: 'activeSensing',
  0xff: 'systemReset'
};