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
  opts = opts || {};

  this._pin = {};

  this.setTime(new Date());

  this._pin.layout = {};
  this._pin.reminders = [];
  this._pin.actions = [];

  if (opts.id) {
    this.setId(opts.id);
  }

  if (opts.time) {
    this.setTime(opts.time);
  }

  if (opts.duration) {
    this.setDuration(opts.duration);
  }

  if (opts.createMessage) {
    this.setCreateMessage(opts.createMessage);
  }

  if (opts.updateMessage) {
    this.setUpdateMessage(opts.updateMessage);
  }

  if (opts.layout) {
    this.setLayout(opts.layout);
  }

  if (opts.reminders) {
    for (var reminder in opts.reminders) {
      this.addReminder(reminder);
    }
  }

  if (opts.actions) {
    for (var action in opts.actions) {
      this.addAction(action);
    }
  }
};

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
 * Set the id
 *
 * @param {String} id
 */
Pin.prototype.setId = function (id) {
  // id should be string
  this._pin.id = id;
};

/**
 * Set the time
 *
 * @param {*} time
 */
Pin.prototype.setTime = function (time) {
  // time should be something Date can understand?
  this._pin.time = new Date(time).toISOString();
};

/**
 * Set the duration
 *
 * @param {Integer} duration
 */
Pin.prototype.setDuration = function (duration) {
  // duration should be integer
  this._pin.duration = duration;
};

/**
 * Set createMessage
 *
 * @param {(Notification|Object)} createMessage
 */
Pin.prototype.setCreateMessage = function (createMessage) {
  // createMessage can be Notification or object
  if (createMessage instanceof(Notification)) {
    createMessage = Notification.getObject();
  }

  this._pin.createMessage = createMessage;
};

/**
 * Set updateMessage
 *
 * @param {(Notification|Object)} updateMessage
 */
Pin.prototype.setUpdateMessage = function (updateMessage) {
  // updateMessage can be Notification or object
  if (updateMessage instanceof(Notification)) {
    updateMessage = Notification.getObject();
  }

  this._pin.updateMessage = updateMessage;
};

/**
 * Set layout
 *
 * @param {(Layout|Object)} layout
 */
Pin.prototype.setLayout = function (layout) {
  // layout can be Layout or object
  if (layout instanceof(Layout)) {
    layout = layout.getObject();
  }

  this._pin.layout = layout;
};

/**
 * Add a reminder
 *
 * @param {(Reminder|Object)} reminder
 */
Pin.prototype.addReminder = function (reminder) {
  // reminder can be Reminder or object
  if (reminder instanceof(Reminder)) {
    reminder = reminder.getObject();
  }

  this._pin.reminders.push(reminder);
};

/**
 * Add an action
 *
 * @param {(Action|Object)} action
 */
Pin.prototype.addAction = function (action) {
  // action can be Action or object
  if (action instanceof(Action)) {
    action = action.getObject();
  }

  this._pin.actions.push(action);
};

/**
 * Get the id
 *
 * @return {String} id
 */
Pin.prototype.getId = function () {
  return this._pin.id;
};

/**
 * Get the pin object
 *
 * @return {Object} _pin
 */
Pin.prototype.getObject = function () {
  return this._pin;
};
