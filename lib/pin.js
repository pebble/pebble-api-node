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
    if (!opts.time instanceof(Date)) {
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
    if (!opts.createMessage instanceof(Notification)) {
      opts.createMessage = new Notification(opts.createMessage);
    }
    this._pin.createMessage = opts.createMessage;
  }

  if (opts && opts.updateMessage) {
    if (!opts.updateMessage instanceof(Notification)) {
      opts.updateMessage = new Notification(opts.updateMessage);
    }
    this._pin.updateMessage = opts.updateMessage;
  }

  if (opts && opts.layout) {
    if (!opts.layout instanceof(Layout)) {
      throw new Error('Expected layout to be a Layout.');
    }
    this._pin.layout = opts.layout;
  }

  if (opts && opts.reminders) {
    if (typeof opts.reminders !== 'array') {
      throw new Error('Expected reminders to be an array.');
    }
    this._pin.reminders = opts.reminders;
  }

  if (opts && opts.actions) {
    if (typeof opts.actions !== 'array') {
      throw new Error('Expected actions to be an array.');
    }
    this._pin.actions = opts.actions;
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

function _Pin (opts) {
  this.time = new Date();
  this.layout = {};
  this.reminders = [];
  this.actions = [];
}

Pin.Icon = {
  Baseball: 'system://images/1',
  ChatBubbles: 'system://images/2',
  TapeCasette: 'system://images/3',
  Football: 'system://images/4',
  Envelope: 'system://images/5',
  Lightbulb: 'system://images/6',
  Calendar: 'system://images/7',
  Sun: 'system://images/8',
  Pin: 'system://images/9',
  Full: 'system://images/10',
  Empty: 'system://images/11',
  AlarmClock: 'system://images/12',
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
 * Set layout
 *
 * @param {(Layout|Object)} layout
 */
Pin.prototype.setLayout = function (layout) {
  if (!layout instanceof(Layout)) {
    layout = new Layout(layout);
  }

  this._pin.layout = layout;

  return this;
};

/**
 * Add a reminder
 *
 * @param {(Reminder|Object)} reminder
 */
Pin.prototype.addReminder = function (reminder) {
  if (!reminder instanceof(Reminder)) {
    reminder = new Reminder(reminder);
  }

  this._pin.reminders.push(reminder);

  return this;
};

/**
 * Add an action
 *
 * @param {(Action|Object)} action
 */
Pin.prototype.addAction = function (action) {
  if (!action instanceof(Action)) {
    action = new Action(action);
  }

  this._pin.actions.push(action);

  return this;
};
