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

  this._pin = new _Pin();

  if (opts && opts.id) {
    if (typeof opts.id !== 'string') {
      throw new Error('Expected id to be a string.');
    }
    this._pin.id = opts.id;
  }

  if (opts && opts.time) {
    if (!(opts.time instanceof Date)) {
      throw new Error('Expected time to be a Date.');
    }
    this._pin.time = opts.time;
  }

  if (opts && opts.duration) {
    if (typeof opts.duration !== 'number') {
      throw new Error('Expected duration to be a number.');
    }
    this._pin.duration = opts.duration;
  }

  if (opts && opts.createMessage) {
    this._pin.createMessage = opts.createMessage instanceof Notification ?
      opts.createMessage : new Notification(opts.createMessage);
  }

  if (opts && opts.updateMessage) {
    this._pin.updateMessage = opts.updateMessage instanceof Notification ?
      opts.updateMessage : new Notification(opts.updateMessage);
  }

  if (opts && opts.layout) {
    if (!(opts.layout instanceof Layout)) {
      opts.layout = new Layout(opts.layout);
    }
    this._pin.layout = opts.layout;
  }

  if (opts && opts.reminders) {
    if (!(opts.reminders instanceof Array)) {
      throw new Error('Expected reminders to be an array.');
    }
    for (var reminder in opts.reminders) {
      this._pin.reminders.push(new Reminder(reminder));
    }
  }

  if (opts && opts.actions) {
    if (!(opts.actions instanceof Array)) {
      throw new Error('Expected actions to be an array.');
    }
    for (var action in opts.actions) {
      this._pin.actions.push(new Action(action));
    }
  }

  if (!this._pin.time) {
    throw new Error('`time` is required by Pin.');
  }

  if (!this._pin.layout) {
    throw new Error('`layout` is required by Pin.');
  }
};


/**
 * Get the Pin JSON Object
 *
 * @return {Object} Pin
 */
Pin.prototype.inspect =
Pin.prototype.toJSON = function () {
  return this._pin;
};

function _Pin () {
  this.reminders = [];
  this.actions = [];
}

Pin.Icon = {
  Baseball: 'system://images/TIMELINE_BASEBALL_TINY',
  ChatBubbles: 'system://images/TIMELINE_CHAT_TINY',
  TapeCasette: 'system://images/TIMELINE_TAPE_TINY',
  Football: 'system://images/TIMELINE_FOOTBALL_TINY',
  Envelope: 'system://images/TIMELINE_MAIL_TINY',
  Lightbulb: 'system://images/TIMELINE_BULB_TINY',
  Calendar: 'system://images/TIMELINE_CALENDAR_TINY',
  Sun: 'system://images/TIMELINE_SUN_TINY',
  Pin: 'system://images/TIMELINE_PIN_TINY',
  BatteryFull: 'system://images/TIMELINE_BAT_FUL_TINY',
  BatteryEmpty: 'system://images/TIMELINE_BATT_EMPTY_TINY',
  AlarmClock: 'system://images/TIMELINE_ALARM_TINY',
};

Pin.LayoutType = {
  genericPin: 'genericPin',
  calendarPin: 'calendarPin',
  genericReminder: 'genericReminder',
  genericNotification: 'genericNotification',
  commNotification: 'commNotification',
  weatherPin: 'weatherPin',
};

Pin.ActionType = {
  openWatchApp: 'openWatchApp',
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
  this._pin.reminders.push(
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
  this._pin.actions.push(
    action instanceof Action ? action : new Action(action)
  );
  return this;
};
