'use strict';

var Layout = require('./layout');

/**
 * Notification
 *
 * @constructor
 * @param {Object} [opts]
 */
module.exports = function (opts) {

  if (opts && opts.time) {
    if (!(opts.time instanceof Date)) {
      throw new Error('Expected time to be a Date.');
    }
    this.time = opts.time;
  }

  if (opts && opts.layout) {
    this.layout =
      opts.layout instanceof Layout ? opts.layout : new Layout(opts.layout);
  }

  if (!this.layout) {
    throw new Error('`layout` is required by Notification.');
  }
};
