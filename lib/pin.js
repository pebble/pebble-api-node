'use strict';

var Action = require('./action');
var Layout = require('./layout');
var Notification = require('./notification');
var Reminder = require('./reminder');

/**
 * Pin
 *
 * @constructor
 * @param {Object} [opts]
 */
var Pin = module.exports = function (opts) {

  this.reminders = [];
  this.actions = [];

  if (opts && opts.id) {
    if (typeof opts.id !== 'string') {
      throw new Error('Expected id to be a string.');
    }
    this.id = opts.id;
  }

  if (opts && opts.time) {
    if (!(opts.time instanceof Date)) {
      throw new Error('Expected time to be a Date.');
    }
    this.time = opts.time;
  }

  if (opts && opts.duration) {
    if (typeof opts.duration !== 'number') {
      throw new Error('Expected duration to be a number.');
    }
    this.duration = opts.duration;
  }

  if (opts && opts.createMessage) {
    this.createMessage = opts.createMessage instanceof Notification ?
      opts.createMessage : new Notification(opts.createMessage);
  }

  if (opts && opts.updateMessage) {
    if (!opts.updateMessage.time) {
      throw new Error('`time` is required by updateMessage.');
    }
    this.updateMessage = opts.updateMessage instanceof Notification ?
      opts.updateMessage : new Notification(opts.updateMessage);
  }

  if (opts && opts.layout) {
    if (!(opts.layout instanceof Layout)) {
      opts.layout = new Layout(opts.layout);
    }
    this.layout = opts.layout;
  }

  if (opts && opts.reminders) {
    if (!(opts.reminders instanceof Array)) {
      throw new Error('Expected reminders to be an array.');
    }
    opts.reminders.forEach(function (reminder) {
      this.reminders.push(new Reminder(reminder));
    }.bind(this));
  }

  if (opts && opts.actions) {
    if (!(opts.actions instanceof Array)) {
      throw new Error('Expected actions to be an array.');
    }
    opts.actions.forEach(function (action) {
      this.actions.push(new Action(action));
    }.bind(this));
  }

  if (!this.time) {
    throw new Error('`time` is required by Pin.');
  }

  if (!this.layout) {
    throw new Error('`layout` is required by Pin.');
  }
};

Pin.Icon = {
  BASEBALL: 'system://images/TIMELINE_BASEBALL_TINY',
  CHAT: 'system://images/TIMELINE_CHAT_TINY',
  TAPE: 'system://images/TIMELINE_TAPE_TINY',
  FOOTBALL: 'system://images/TIMELINE_FOOTBALL_TINY',
  MAIL: 'system://images/TIMELINE_MAIL_TINY',
  BULB: 'system://images/TIMELINE_BULB_TINY',
  CALENDAR: 'system://images/TIMELINE_CALENDAR_TINY',
  SUN: 'system://images/TIMELINE_SUN_TINY',
  PIN: 'system://images/TIMELINE_PIN_TINY',
  BATT_FULL: 'system://images/TIMELINE_BATT_FULL_TINY',
  BATT_EMPTY: 'system://images/TIMELINE_BATT_EMPTY_TINY',
  ALARM: 'system://images/TIMELINE_ALARM_TINY',
};

Pin.LayoutType = {
  GENERIC_PIN: 'genericPin',
  CALENDAR_PIN: 'calendarPin',
  GENERIC_REMINDER: 'genericReminder',
  GENERIC_NOTIFICATION: 'genericNotification',
  COMM_NOTIFICATION: 'commNotification',
  WEATHER_PIN: 'weatherPin',
  SPORTS_PIN: 'sportsPin',
};

Pin.ActionType = {
  OPEN_WATCH_APP: 'openWatchApp',
};

Pin.Action = Action;
Pin.Layout = Layout;
Pin.Notification = Notification;
Pin.Reminder = Reminder;

/**
 * Add a reminder
 *
 * @param {(Reminder|Object)} reminder
 */
Pin.prototype.addReminder = function (reminder) {
  this.reminders.push(
    reminder instanceof Reminder ? reminder : new Reminder(reminder)
  );
  return this;
};

/**
 * Add an action
 *
 * @param {(Action|Object)} action
 */
Pin.prototype.addAction = function (action) {
  this.actions.push(
    action instanceof Action ? action : new Action(action)
  );
  return this;
};
