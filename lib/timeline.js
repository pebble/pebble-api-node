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

  this._apiKey = opts.apiKey;

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
  if (typeof(userToken) !== 'string') {
    return callback('Expected userToken to be a string.');
  }

  if (!pin instanceof(Pin)) {
    return callback(new Error('Invalid Pin.'));
  }

  var json = pin.toJSON();

  var headers = {'X-User-Token': userToken};

  this._put('/v1/user/pins/' + json.id, headers, json, callback);
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

  if (!pin instanceof(Pin)) {
    return callback(new Error('Invalid Pin.'));
  }

  var json = pin.toJSON();

  var headers = {
    'X-API-Key': this._apiKey,
    'X-PIN-Topics': topics.toString()
  };

  this._put('/v1/shared/pins/' + json.id, headers, json, callback);
};

/**
 * Subscribe to a topic
 *
 * @param {String} userToken
 * @param {String} topic
 * @callback {callback} callback
 */
Timeline.prototype.subscribe = function (userToken, topic, callback) {
  var headers = {'X-User-Token': userToken};

  this._post('/v1/user/subscriptions/' + topic, headers, null, callback);
};

/**
 * Unsubscribe from a topic
 *
 * @param {String} userToken
 * @param {String} topic
 * @callback {callback} callback
 */
Timeline.prototype.unsubscribe = function (userToken, topic, callback) {
  var headers = {'X-User-Token': userToken};

  this._delete('/v1/user/subscriptions/' + topic, headers, callback);
};


Timeline.prototype._put = function(endpoint, headers, body, callback) {
  return this.__request('PUT', endpoint, headers, body, callback);
};

Timeline.prototype._post = function(endpoint, headers, body, callback) {
  return this.__request('POST', endpoint, headers, body, callback);
};

Timeline.prototype._delete = function(endpoint, headers, callback) {
  return this.__request('DELETE', endpoint, headers, null, callback);
};

Timeline.prototype.__request = function(method, endpoint, headers, body, callback) {
  if (typeof callback !== 'function') {
    throw new Error('Callback not set but is required.');
  }

  var options = {};

  options.method = method.toUpperCase();
  options.headers = headers || {};
  options.url = this._apiRoot + endpoint;

  switch (method) {
    case 'PUT':
      options.body = body;
      options.json = true;
      break;
  }

  request(options, function (err, res, body) {
    if (err) {
      return callback(err, body, res);
    }

    if (res.statusCode < 300) {
      return callback(null, body, res);
    }

    switch (res.statusCode) {
      case 400:
        callback(new Error('The pin object submitted was invalid.'), body, res);
        break;
      case 403:
        callback(new Error('The API key submitted was invalid.'), body, res);
        break;
      case 410:
        callback(new Error('The user token submitted was invalid or does not exist.'), body, res);
        break;
      case 429:
        callback(new Error('Server is sending updates too quickly.'), body, res);
        break;
      case 503:
        callback(new Error('Could not save pin due to a temporary server error.'), body, res);
        break;
      default:
        callback(new Error('Unknown error. Status code: ' + res.statusCode), body, res);
        break;
    }
  });
};
