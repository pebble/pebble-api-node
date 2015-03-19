'use strict';

var Layout = require('./layout');

/**
 * Notification
 *
 * @constructor
 * @param {Object} [opts]
 */
var Notification = module.exports = function (opts) {

  this._notification = new _Notification();

  if (opts && opts.time) {
    if (false === opts.time instanceof Date) {
      throw new Error('Expected time to be a Date.');
    }
    opts._notification.time = opts.time;
  }

  if (opts && opts.layout) {
    if (false === opts.layout instanceof Layout) {
      opts.layout = new Layout(opts.layout);
    }
    opts._notification.layout = opts.layout;
  }
};

/**
 * Get the Notification JSON Object
 *
 * @return {Object} Notification
 */
Notification.prototype.inspect =
Notification.prototype.toJSON = function () {
  return this._notification;
};

function _Notification () {
}
