'use strict';

var Action = require('./action');
var Layout = require('./layout');
var Notification = require('./notification');
var Reminder = require('./reminder');
var Joi = require('joi');

var schema = Joi.object().keys({
  id: Joi.string().max(64),
  time: Joi.date().iso().required(),
  duration: Joi.number(),
  createNotification: Joi.object(),
  updateNotification: Joi.object(),
  layout: Joi.object().required(),
  reminders: Joi.array().items(Joi.object()).max(3),
  actions: Joi.array().items(Joi.object())
}).required();

/**
 * Pin
 *
 * @constructor
 * @param {Object} [opts]
 */
var Pin = module.exports = function (opts) {

  var validated = Joi.validate(opts, schema);

  if (validated.error) {
    throw validated.error;
  }

  this.opts = validated.value;

  var createNotification = this.opts.createNotification;
  var updateNotification = this.opts.updateNotification;
  var layout = this.opts.layout;
  var reminders = this.opts.reminders;
  var actions = this.opts.actions;

  this.opts.reminders = reminders || [];
  this.opts.actions = actions || [];

  if (createNotification && !(createNotification instanceof Notification)) {
    this.opts.createNotification = new Notification(createNotification);
  }

  if (updateNotification && !(updateNotification instanceof Notification)) {
    this.opts.updateNotification = new Notification(updateNotification);
  }

  updateNotification = this.opts.updateNotification;

  if (updateNotification && !updateNotification.opts.time) {
    throw new Error('`time` is required by updateNotification.');
  }

  if (!(layout instanceof Layout)) {
    this.opts.layout = new Layout(layout);
  }

  if (reminders) reminders.map(function (obj) {
    if (obj instanceof Reminder) {
      return obj;
    }

    return new Reminder(obj);
  });

  if (actions) actions.map(function (obj) {
    if (obj instanceof Action) {
      return obj;
    }

    return new Action(obj);
  });
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
  this.opts.reminders.push(
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
  this.opts.actions.push(
    action instanceof Action ? action : new Action(action)
  );
  return this;
};
