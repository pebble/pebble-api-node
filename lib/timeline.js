'use strict';

var Bluebird = require('bluebird');
var request = Bluebird.promisify(require('request'));

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
    return Bluebird.reject(new Error('Expected userToken to be a string.'))
      .nodeify(callback);
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

  return this._request(opts).nodeify(callback);
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
    return Bluebird.reject(new Error('API Key not set.')).nodeify(callback);
  }

  if (!(topics instanceof Array)) {
    return Bluebird.reject(new Error('Expected topics to be an array.'))
      .nodeify(callback);
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

  return this._request(opts).nodeify(callback);
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
    return process.nextTick(function () {
      callback(new Error('Expected userToken to be a string.'));
    });
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
    return Bluebird.reject(new Error('Expected userToken to be a string.'))
      .nodeify(callback);
  }

  if (typeof topic !== 'string') {
    return Bluebird.reject(new Error('Expected topic to be a string.'))
      .nodeify(callback);
  }

  var opts = {
    method: 'POST',
    endpoint: '/v1/user/subscriptions/' + topic,
    headers: {
      'X-User-Token': userToken
    }
  };

  return this._request(opts).nodeify(callback);
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
    return Bluebird.reject(new Error('Expected userToken to be a string.'))
      .nodeify(callback);
  }

  if (typeof topic !== 'string') {
    return Bluebird.reject(new Error('Expected topic to be a string.'))
      .nodeify(callback);
  }

  var opts = {
    method: 'DELETE',
    endpoint: '/v1/user/subscriptions/' + topic,
    headers: {
      'X-User-Token': userToken
    }
  };

  return this._request(opts).nodeify(callback);
};

Timeline.prototype._request = function(opts, callback) {
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

  return request(reqOpts).then(function (data) {
    var res = data[0];
    if (res.statusCode < 300) {
      return res.body;
    }
    if (Timeline.errorCodes[res.statusCode]) {
      throw new Error(Timeline.errorCodes[res.statusCode]);
    }
    throw new Error('Unknown error. Status code: ' + res.statusCode);
  }).nodeify(callback);
};

Timeline.errorCodes = {
  400: 'The pin object submitted was invalid.',
  403: 'The API key submitted was invalid.',
  410: 'The user token submitted was invalid or does not exist.',
  429: 'Server is sending updates too quickly.',
  503: 'Could not save pin due to a temporary server error.',
};
