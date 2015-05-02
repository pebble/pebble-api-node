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

  if (opts && opts.createNotification) {
    this.createNotification = opts.createNotification instanceof Notification ?
      opts.createNotification : new Notification(opts.createNotification);
  }

  if (opts && opts.updateNotification) {
    if (!opts.updateNotification.time) {
      throw new Error('`time` is required by updateNotification.');
    }
    this.updateNotification = opts.updateNotification instanceof Notification ?
      opts.updateNotification : new Notification(opts.updateNotification);
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
  NOTIFICATION_GENERIC: 'system://images/NOTIFICATION_GENERIC',
  NOTIFICATION_REMINDER: 'system://images/NOTIFICATION_REMINDER',
  NOTIFICATION_FLAG: 'system://images/NOTIFICATION_FLAG',
  NOTIFICATION_FACEBOOK_MESSENGER: 'system://images/NOTIFICATION_FACEBOOK_MESSENGER',
  NOTIFICATION_WHATSAPP: 'system://images/NOTIFICATION_WHATSAPP',
  NOTIFICATION_GMAIL: 'system://images/NOTIFICATION_GMAIL',
  NOTIFICATION_FACEBOOK: 'system://images/NOTIFICATION_FACEBOOK',
  NOTIFICATION_GOOGLE_HANGOUTS: 'system://images/NOTIFICATION_GOOGLE_HANGOUTS',
  NOTIFICATION_TELEGRAM: 'system://images/NOTIFICATION_TELEGRAM',
  NOTIFICATION_TWITTER: 'system://images/NOTIFICATION_TWITTER',
  NOTIFICATION_GOOGLE_INBOX: 'system://images/NOTIFICATION_GOOGLE_INBOX',
  NOTIFICATION_MAILBOX: 'system://images/NOTIFICATION_MAILBOX',
  NOTIFICATION_OUTLOOK: 'system://images/NOTIFICATION_OUTLOOK',
  NOTIFICATION_INSTAGRAM: 'system://images/NOTIFICATION_INSTAGRAM',
  NOTIFICATION_BLACKBERRY_MESSENGER:
                     'system://images/NOTIFICATION_BLACKBERRY_MESSENGER',
  NOTIFICATION_LINE: 'system://images/NOTIFICATION_LINE',
  NOTIFICATION_SNAPCHAT: 'system://images/NOTIFICATION_SNAPCHAT',
  NOTIFICATION_WECHAT: 'system://images/NOTIFICATION_WECHAT',
  NOTIFICATION_VIBER: 'system://images/NOTIFICATION_VIBER',
  NOTIFICATION_SKYPE: 'system://images/NOTIFICATION_SKYPE',
  NOTIFICATION_YAHOO_MAIL: 'system://images/NOTIFICATION_YAHOO_MAIL',
  GENERIC_EMAIL: 'system://images/GENERIC_EMAIL',
  GENERIC_SMS: 'system://images/GENERIC_SMS',
  GENERIC_WARNING: 'system://images/GENERIC_WARNING',
  GENERIC_CONFIRMATION: 'system://images/GENERIC_CONFIRMATION',
  GENERIC_QUESTION: 'system://images/GENERIC_QUESTION',
  PARTLY_CLOUDY: 'system://images/PARTLY_CLOUDY',
  CLOUDY_DAY: 'system://images/CLOUDY_DAY',
  LIGHT_SNOW: 'system://images/LIGHT_SNOW',
  LIGHT_RAIN: 'system://images/LIGHT_RAIN',
  HEAVY_RAIN: 'system://images/HEAVY_RAIN',
  HEAVY_SNOW: 'system://images/HEAVY_SNOW',
  TIMELINE_WEATHER: 'system://images/TIMELINE_WEATHER',
  TIMELINE_SUN: 'system://images/TIMELINE_SUN',
  RAINING_AND_SNOWING: 'system://images/RAINING_AND_SNOWING',
  TIMELINE_MISSED_CALL: 'system://images/TIMELINE_MISSED_CALL',
  TIMELINE_CALENDAR: 'system://images/TIMELINE_CALENDAR',
  TIMELINE_SPORTS: 'system://images/TIMELINE_SPORTS',
  TIMELINE_BASEBALL: 'system://images/TIMELINE_BASEBALL',
  AMERICAN_FOOTBALL: 'system://images/AMERICAN_FOOTBALL',
  CRICKET_GAME: 'system://images/CRICKET_GAME',
  SOCCER_GAME: 'system://images/SOCCER_GAME',
  HOCKEY_GAME: 'system://images/HOCKEY_GAME',
  RESULT_DISMISSED: 'system://images/RESULT_DISMISSED',
  RESULT_DELETED: 'system://images/RESULT_DELETED',
  RESULT_MUTE: 'system://images/RESULT_MUTE',
  RESULT_SENT: 'system://images/RESULT_SENT',
  RESULT_FAILED: 'system://images/RESULT_FAILED',
  STOCKS_EVENT: 'system://images/STOCKS_EVENT',
  MUSIC_EVENT: 'system://images/MUSIC_EVENT',
  BIRTHDAY_EVENT: 'system://images/BIRTHDAY_EVENT',
  PAY_BILL: 'system://images/PAY_BILL',
  HOTEL_RESERVATION: 'system://images/HOTEL_RESERVATION',
  TIDE_IS_HIGH: 'system://images/TIDE_IS_HIGH',
  NEWS_EVENT: 'system://images/NEWS_EVENT',
  SCHEDULED_EVENT: 'system://images/SCHEDULED_EVENT',
  DURING_PHONE_CALL: 'system://images/DURING_PHONE_CALL',
  CHECK_INTERNET_CONNECTION: 'system://images/CHECK_INTERNET_CONNECTION',
  MOVIE_EVENT: 'system://images/MOVIE_EVENT',
  GLUCOSE_MONITOR: 'system://images/GLUCOSE_MONITOR',
  ALARM_CLOCK: 'system://images/ALARM_CLOCK',
  CAR_RENTAL: 'system://images/CAR_RENTAL',
  DINNER_RESERVATION: 'system://images/DINNER_RESERVATION',
  RADIO_SHOW: 'system://images/RADIO_SHOW',
  AUDIO_CASSETTE: 'system://images/AUDIO_CASSETTE',
  SCHEDULED_FLIGHT: 'system://images/SCHEDULED_FLIGHT',
  NO_EVENTS: 'system://images/NO_EVENTS',
  REACHED_FITNESS_GOAL: 'system://images/REACHED_FITNESS_GOAL',
  DAY_SEPARATOR: 'system://images/DAY_SEPARATOR',
  WATCH_DISCONNECTED: 'system://images/WATCH_DISCONNECTED',
  TV_SHOW: 'system://images/TV_SHOW',

  /* deprecated */
  BASEBALL: 'system://images/TIMELINE_BASEBALL',
  CHAT: 'system://images/GENERIC_EMAIL',
  TAPE: 'system://images/AUDIO_CASSETTE',
  FOOTBALL: 'system://images/AMERICAN_FOOTBALL',
  MAIL: 'system://images/GENERIC_EMAIL',
  BULB: 'system://images/NOTIFICATION_FLAG',
  CALENDAR: 'system://images/TIMELINE_CALENDAR',
  SUN: 'system://images/TIMELINE_SUN',
  PIN: 'system://images/NOTIFICATION_FLAG',
  BATT_FULL: 'system://images/NOTIFICATION_FLAG',
  BATT_EMPTY: 'system://images/NOTIFICATION_FLAG',
  ALARM: 'system://images/ALARM_CLOCK',
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
