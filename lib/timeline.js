'use strict';

var request = require('request');

var Pin = require('./pin');

var API_ROOT = 'https://timeline-api.getpebble.com';

/**
 * Timeline
 *
 * @constructor
 * @param {Object} [opts]
 */
var Timeline = module.exports = function (opts) {
  opts = opts || {};

  this._apiKey = opts.apiKey || process.env.PEBBLE_TIMELINE_API_KEY;

  this._apiRoot = opts.apiRoot || process.env.PEBBLE_TIMELINE_API_ROOT || API_ROOT;
};

Timeline.Pin = Pin;

/**
 * Send a pin to a user
 *
 * @param {String} userToken
 * @param {Pin} pin
 * @callback {callback} callback
 */
Timeline.prototype.sendUserPin = function (userToken, pin, callback) {
  if (typeof userToken !== 'string') {
    return callback(new Error('Expected userToken to be a string.'));
  }

  if (!(pin instanceof Pin)) {
    pin = new Pin(pin);
  }

  var opts = {
    method: 'PUT',
    endpoint: '/v1/user/pins/' + pin.id,
    headers: {
      'X-User-Token': userToken
    },
    body: pin
  };

  this._request(opts, callback);
};

/**
 * Send a pin to a topic
 *
 * @param {Array} topics
 * @param {Pin} pin
 * @callback {callback} callback
 */
Timeline.prototype.sendSharedPin = function (topics, pin, callback) {
  if (!this._apiKey) {
    return callback(new Error('API Key not set.'));
  }

  if (!(topics instanceof Array)) {
    return callback(new Error('Expected topics to be an array.'));
  }

  if (!(pin instanceof Pin)) {
    pin = new Pin(pin);
  }

  var opts = {
    method: 'PUT',
    endpoint: '/v1/shared/pins/' + pin.id,
    headers: {
      'X-API-Key': this._apiKey,
      'X-PIN-Topics': topics.join(',')
    },
    body: pin
  };

  this._request(opts, callback);
};

/**
 * Delete a pin from user's timeline
 *
 * @param {String} userToken
 * @param {Pin} pin
 * @return {callback} callback
 */
Timeline.prototype.deleteUserPin = function (userToken, pin, callback) {
  if (typeof userToken !== 'string') {
    return callback(new Error('Expected userToken to be a string.'));
  }

  if (!(pin instanceof Pin)) {
    pin = new Pin(pin);
  }

  var opts = {
    method: 'DELETE',
    endpoint: '/v1/user/pins/' + pin.id,
    headers: {
      'X-User-Token': userToken
    }
  };

  this._request(opts, callback);
};

/**
 * Subscribe to a topic
 *
 * @param {String} userToken
 * @param {String} topic
 * @callback {callback} callback
 */
Timeline.prototype.subscribe = function (userToken, topic, callback) {
  if (typeof userToken !== 'string') {
    return callback(new Error('Expected userToken to be a string.'));
  }

  if (typeof topic !== 'string') {
    return callback(new Error('Expected topic to be a string.'));
  }

  var opts = {
    method: 'POST',
    endpoint: '/v1/user/subscriptions/' + topic,
    headers: {
      'X-User-Token': userToken
    }
  };

  this._request(opts, callback);
};

/**
 * Unsubscribe from a topic
 *
 * @param {String} userToken
 * @param {String} topic
 * @callback {callback} callback
 */
Timeline.prototype.unsubscribe = function (userToken, topic, callback) {
  if (typeof userToken !== 'string') {
    return callback(new Error('Expected userToken to be a string.'));
  }

  if (typeof topic !== 'string') {
    return callback(new Error('Expected topic to be a string.'));
  }

  var opts = {
    method: 'DELETE',
    endpoint: '/v1/user/subscriptions/' + topic,
    headers: {
      'X-User-Token': userToken
    }
  };

  this._request(opts, callback);
};

Timeline.prototype._request = function(opts, callback) {
  if (typeof callback !== 'function') {
    throw new Error('Callback not set but is required.');
  }

  var reqOpts = {};

  reqOpts.method = opts.method.toUpperCase();
  reqOpts.headers = opts.headers;
  reqOpts.url = this._apiRoot + opts.endpoint;

  switch (reqOpts.method) {
    case 'PUT':
      reqOpts.body = opts.body;
      reqOpts.json = true;
      break;
  }

  request(reqOpts, function (err, res, body) {
    if (err) {
      return callback(err, body, res);
    }

    if (res.statusCode < 300) {
      return callback(null, body, res);
    }

    if (Timeline.errorCodes[res.statusCode]) {
      return callback(new Error(Timeline.errorCodes[res.statusCode]), body, res);
    }

    callback(new Error('Unknown error. Status code: ' + res.statusCode), body, res);
  });
};

Timeline.errorCodes = {
  400: 'The pin object submitted was invalid.',
  403: 'The API key submitted was invalid.',
  410: 'The user token submitted was invalid or does not exist.',
  429: 'Server is sending updates too quickly.',
  503: 'Could not save pin due to a temporary server error.',
};
