/* global describe */
/* global it */
/* global beforeEach */

var assert = require('assert');

var Pin = require('../lib/timeline').Pin;
var Action = Pin.Action;

describe('Action', function () {
  'use strict';
  
  it('should throw an error if title is not a string', function (done) {
    var actionData = { title: 5, type: Pin.ActionType.openWatchApp, launchCode: 0 };
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
      type: Pin.ActionType.openWatchApp,
      launchCode: '4'
    };
    assert.throws(function () { new Action(actionData); });
    done();
  });
  
  it('should accept a valid action options', function (done) {
    var actionData = {
      title: 'Action',
      type: Pin.ActionType.openWatchApp,
      launchCode: 4
    };
    new Action(actionData); 
    done();
  });
  
  describe('#toJSON', function () {
    var action;
    var actionData = {
      title: 'Action',
      type: Pin.ActionType.openWatchApp,
      launchCode: 4
    };
    
    beforeEach(function (done) {
      action = new Action(actionData);
      done();
    });
    
    it('should return an object literal', function (done) {
      assert.deepEqual(action.toJSON(), actionData)
      done();
    });
    
  });
  
  describe('#inspect', function () {
    var action;
    var actionData = {
      title: 'Action',
      type: Pin.ActionType.openWatchApp,
      launchCode: 4
    };
    
    beforeEach(function (done) {
      action = new Action(actionData);
      done();
    });
    
    it('should return an object literal', function (done) {
      assert.deepEqual(action.inspect(), actionData);
      done();
    });
    
  });

});
