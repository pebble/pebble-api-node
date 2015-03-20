/* global describe */
/* global it */

var assert = require('assert');

var Pin = require('../lib/timeline').Pin;
var Action = Pin.Action;

describe('Action', function () {
  'use strict';

  it('should throw an error if title is not a string', function (done) {
    var actionData = {
      title: 5,
      type: Pin.ActionType.OPEN_WATCH_APP,
      launchCode: 0
    };
    assert.throws(function () { new Action(actionData); });
    done();
  });

  it('should throw an error if action is not a string', function (done) {
    var actionData = { title: 'Action', type: 5, launchCode: 0 };
    assert.throws(function () { new Action(actionData); });
    done();
  });

  it('should throw an error if launchCode is not a string', function (done) {
    var actionData = {
      title: 'Action',
      type: Pin.ActionType.OPEN_WATCH_APP,
      launchCode: '4'
    };
    assert.throws(function () { new Action(actionData); });
    done();
  });

  it('should accept a valid action options', function (done) {
    var actionData = {
      title: 'Action',
      type: Pin.ActionType.OPEN_WATCH_APP,
      launchCode: 4
    };
    new Action(actionData);
    done();
  });

});
