'use strict';

var Layout = require('./layout');

/**
 * Reminder
 *
 * @constructor
 * @param {Object} [opts]
 */
var Reminder = module.exports = function (opts) {

  this._reminder = new _Reminder();

  if (opts && opts.time) {
    if (!opts.time instanceof(Date)) {
      throw new Error('Expected time to be a Date.');
    }
    this._reminder.time = opts.time;
  }

  if (opts && opts.layout) {
    if (!opts.layout instanceof(Layout)) {
      layout = new Layout(layout);
    }
    this._reminder.layout = opts.layout;
  }
};

/**
 * Get the Reminder JSON Object
 *
 * @return {Object} Reminder
 */
Reminder.prototype.inspect =
Reminder.prototype.toJSON = function () {
  return this._reminder;
};

function _Reminder (opts) {
  // add required params here
}
