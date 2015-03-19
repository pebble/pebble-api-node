/* global describe */
/* global it */

var assert = require('assert');

var Pin = require('../lib/timeline').Pin;

describe('Pin', function () {
  'use strict';
    
  it('should throw if id is not a string', function (done) {
    assert.throws(function () { new Pin({ id: 5 }); });
    done();
  });
  
  it('should throw if time is not a Date object', function (done) {
    assert.throws(function () { new Pin({ time: 5 }); });
    done();
  });
  
  it('should throw if duration is not a number', function (done) {
    assert.throws(function () { new Pin({ duration: '50' }); });
    done();
  });
    
  it('should throw if reminders is not an array', function (done) {
    assert.throws(function () { new Pin({ reminders: {} }); });
    done();
  });
  
  it('should throw if actions is not an array', function (done) {
    assert.throws(function () { new Pin({ actions: 'Do a thing' }); });
    done();
  });
  
  it('should throw if time is not set', function (done) {
    assert.throws(function () { new Pin({ layout: new Pin.Layout() }); });
    done();
  });
  
  it('should throw if layout is not set', function (done) {
    assert.throws(function () { new Pin({ time: new Date() }); });
    done();
  });
  
  it('should set the properties passed in at construction', function (done) {
    var now = new Date();
    var pin  = new Pin({
      id: 'ABCDEF',
      time: now,
      duration: 1000,
      layout: new Pin.Layout(),
      createMessage: new Pin.Notification(),
      updateMessage: new Pin.Notification(),
      actions: [
        new Pin.Action()
      ],
      reminders: [
        new Pin.Reminder()
      ],
    });
    assert.equal(pin.toJSON().time, now);
    assert.equal(pin.toJSON().duration, 1000);
    assert.equal(pin.toJSON().id, 'ABCDEF');
    done();
  });
  
  it('should convert layout to a Layout object', function (done) {
    var pin  = new Pin({
      time: new Date(),
      layout: {},
    });
    assert.ok(pin.toJSON().layout instanceof Pin.Layout);
    done();
  });

  
  it('should convert createMessage to a Notification object', function (done) {
    var pin  = new Pin({
      time: new Date(),
      layout: new Pin.Layout(),
      createMessage: {},
    });
    assert.ok(pin.toJSON().createMessage instanceof Pin.Notification);
    done();
  });
  
  it('should convert updateMessage to a Notification object', function (done) {
    var pin  = new Pin({
      time: new Date(),
      layout: new Pin.Layout(),
      updateMessage: {},
    });
    assert.ok(pin.toJSON().updateMessage instanceof Pin.Notification);
    done();
  });
  
  describe('#setLayout', function () {
    
    it('should throw if layout is not a Layout object', function (done) {
      assert.throws(function () { new Pin({ layout: 'layout4' }); });
      done();
    });
    
    it('should update the layout of the pin', function (done) {
      done();
    });
    
  });
  
});
