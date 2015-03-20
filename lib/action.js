'use strict';

/**
 * Action
 *
 * @constructor
 * @param {Object} [opts]
 */
module.exports = function (opts) {

  if (opts && opts.title) {
    if (typeof opts.title !== 'string') {
      throw new Error('Expected title to be a string.');
    }
    this.title = opts.title;
  }

  if (opts && opts.type) {
    if (typeof opts.type !== 'string') {
      throw new Error('Expected type to be a string.');
    }
    this.type = opts.type;
  }

  if (opts && opts.launchCode) {
    if (typeof opts.launchCode !== 'number') {
      throw new Error('Expected launchCode to be a number.');
    }
    this.launchCode = opts.launchCode;
  }

  if (!this.type) {
    throw new Error('`type` is required by Action.');
  }
};
