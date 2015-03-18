'use strict';

var request = require('request');

var Pin = require('./pin');

var API_ROOT = 'https://timeline-api.getpebble.com';

/**
 * Timeline
 *
 * @param {Object} `opts` [optional]
 */
var Timeline = module.exports = function (opts) {
  opts = opts || {};

  this._apiKey;

  this._apiRoot = opts.apiRoot || process.env.TIMELINE_API_ROOT || API_ROOT;
};

Timeline.Pin = Pin;

/**
 * Set the API Key
 *
 * @param {String} `key`
 */
Timeline.prototype.setApiKey = function (key) {
  this._apiKey = key;
};

/**
 * Set the API Root
 *
 * @param {String} `url`
 */
Timeline.prototype.setApiRoot = function (url) {
  this._apiRoot = url;
};

/**
 * Send a pin to a user
 *
 * @param {String} `userToken`
 * @param {Pin} `pin`
 */
Timeline.prototype.sendUserPin = function (userToken, pin, callback) {
  if (!pin instanceof(Pin)) {
    return callback(new Error('Error: Invalid Pin.'));
  }

  var headers = {'X-User-Token': userToken};

  this._put('/v1/user/pins/' + pin.getId(), headers, pin.getObject(), callback);
};

/**
 * Send a pin to a topic
 *
 * @param {Array} `topics`
 * @param {Pin} `pin`
 */
Timeline.prototype.sendSharedPin = function (topics, pin, callback) {
  if (!this._apiKey) {
    return callback(new Error('Error: API Key not set.'));
  }

  if (!pin instanceof(Pin)) {
    return callback(new Error('Error: Invalid Pin.'));
  }

  var headers = {
    'X-API-Key': this._apiKey,
    'X-PIN-Topics': topics.toString()
  };

  this._put('/v1/shared/pins/' + pin.getId(), headers, pin.getObject(), callback);
};

/**
 * Subscribe to a topic
 *
 * @param {String} `userToken`
 * @param {String} `topic`
 */
Timeline.prototype.subscribe = function (userToken, topic, callback) {
  var headers = {'X-User-Token': userToken};

  this._post('/v1/user/subscriptions/' + topic, headers, null, callback);
};

/**
 * Unsubscribe from a topic
 *
 * @param {String} `userToken`
 * @param {String} `topic`
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
  if (typeof callback !== 'function') callback = function(){};

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
      case 523:
        callback(new Error('Could not save pin due to a temporary server error.'), body, res);
        break;
      default:
        callback(new Error('Unknown error. Status code: ' + res.statusCode), body, res);
        break;
    }
  });
};
