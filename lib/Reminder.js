'use strict';

var Layout = require('./Layout');

/**
 * Reminder
 *
 * @param {Object} `opts` [optional]
 */
var Reminder = module.exports = function (opts) {
  opts = opts || {};

  this._reminder = {};

  if (opts.time) {
    this.setTime(opts.time);
  }

  if (opts.layout) {
    this.setLayout(opts.layout);
  }
};

/**
 * Set time
 *
 * @param {*} `time`
 */
Reminder.prototype.setTime = function (time) {
  this._reminder.time = new Date(time).toISOString();
};

/**
 * Set layout
 *
 * @param {Layout/Object} `layout`
 */
Reminder.prototype.setLayout = function (layout) {
  if (layout instanceof(Layout)) {
    layout = layout.getLayout();
  }

  this._reminder.layout = layout;
};

/**
 * Get the reminder object
 *
 * @return {Object} `_reminder`
 */
Reminder.prototype.getReminder = function () {
  return this._reminder;
};
