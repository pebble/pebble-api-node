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
    if (!opts.time instanceof(Date)) {
      throw new Error('Expected time to be a Date.');
    }
    opts._notification.time = opts.time; // remember to change this to ISO string
  }

  if (opts && opts.layout) {
    if (!opts.layout instanceof(Layout)) {
      layout = new Layout(layout);
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

function _Notification (opts) {
  // add required params here
}
