'use strict';

var Layout = require('./layout');

/**
 * Notification
 *
 * @param {Object} `opts` [optional]
 */
var Notification = module.exports = function (opts) {
  opts = opts || {};

  this._notification = {};

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
Notification.prototype.setTime = function (time) {
  this._notification.time = new Date(time).toISOString();
};

/**
 * Set layout
 *
 * @param {Layout/Object} `layout`
 */
Notification.prototype.setLayout = function (layout) {
  if (layout instanceof(Layout)) {
    layout = layout.getLayout();
  }

  this._notification.layout = layout;
};

/**
 * Get the notification object
 *
 * @return {Object} `_notification`
 */
Notification.prototype.getNotification = function () {
  return this._notification;
};
