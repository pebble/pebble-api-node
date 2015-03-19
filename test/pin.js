/* global describe */
/* global it */
/* global beforeEach */

var assert = require('assert');

var Pin = require('../lib/timeline').Pin;

describe('Pin', function () {
  'use strict';

  var layout = new Pin.Layout({
    type: Pin.LayoutType.genericPin,
    title: 'Pin Title',
    tinyIcon: Pin.Icon.Pin
  });

  it('should throw if id is not a string', function (done) {
    var pinData = { id: 5, layout: layout };
    assert.throws(function () { new Pin(pinData); });
    done();
  });

  it('should throw if time is not a Date object', function (done) {
    var pinData = { time: 5, layout: layout };
    assert.throws(function () { new Pin(pinData); });
    done();
  });

  it('should throw if duration is not a number', function (done) {
    var pinData = { duration: '50', layout: layout };
    assert.throws(function () { new Pin(pinData); });
    done();
  });

  it('should throw if reminders is not an array', function (done) {
    var pinData = { reminders: {}, layout: layout };
    assert.throws(function () { new Pin(pinData); });
    done();
  });

  it('should throw if actions is not an array', function (done) {
    var pinData = { actions: 'Do a thing', layout: layout };
    assert.throws(function () { new Pin(pinData); });
    done();
  });

  it('should throw if time is not set', function (done) {
    var pinData = {
      layout: layout
    };
    assert.throws(function () { new Pin(pinData); });
    done();
  });

  it('should throw if layout is not set', function (done) {
    var pinData = {
      time: new Date()
    };
    assert.throws(function () { new Pin(pinData); });
    done();
  });

  it('should set the properties passed in at construction', function (done) {
    var now = new Date();
    var pin  = new Pin({
      id: 'ABCDEF',
      time: now,
      duration: 1000,
      layout: new Pin.Layout({
        type: 'genericPin',
        title: 'Title',
        tinyIcon: Pin.Icon.Pin
      }),
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
      layout: {
        type: 'genericPin',
        title: 'Title',
        tinyIcon: Pin.Icon.Pin
      },
    });
    assert.ok(pin.toJSON().layout instanceof Pin.Layout);
    done();
  });

  it('should convert createMessage to a Notification object', function (done) {
    var pin  = new Pin({
      time: new Date(),
      layout: new Pin.Layout({
        type: 'genericPin',
        title: 'Title',
        tinyIcon: Pin.Icon.Football
      }),
      createMessage: {},
    });
    assert.ok(pin.toJSON().createMessage instanceof Pin.Notification);
    done();
  });

  it('should convert updateMessage to a Notification object', function (done) {
    var pin  = new Pin({
      time: new Date(),
      layout: new Pin.Layout({
        type: 'genericPin',
        title: 'Title',
        tinyIcon: Pin.Icon.Sun
      }),
      updateMessage: {},
    });
    assert.ok(pin.toJSON().updateMessage instanceof Pin.Notification);
    done();
  });

  describe('#addReminder', function () {

    var pin;

    beforeEach(function () {
      pin  = new Pin({
        time: new Date(),
        layout: new Pin.Layout({
          type: Pin.LayoutType.genericPin,
          title: 'Pin Title',
          tinyIcon: Pin.Icon.Pin
        })
      });
    });

    it.skip('should throw if reminder is not valid', function (done) {
      assert.throws(function () { pin.addReminder(5); });
      done();
    });

    it('should add a new reminder to the pin', function (done) {
      var newReminder = new Pin.Reminder();
      assert.equal(0, pin.toJSON().reminders.length);
      pin.addReminder(newReminder);
      assert.equal(1, pin.toJSON().reminders.length);
      assert.equal(pin.toJSON().reminders[0], newReminder);
      done();
    });

    it('should convert an object literal to Reminder object', function (done) {
      assert.equal(0, pin.toJSON().reminders.length);
      pin.addReminder({ });
      assert.equal(1, pin.toJSON().reminders.length);
      assert.ok(pin.toJSON().reminders[0] instanceof Pin.Reminder);
      done();
    });

  });

  describe('#addAction', function () {

    var pin;

    beforeEach(function () {
      pin  = new Pin({
        time: new Date(),
        layout: new Pin.Layout({
          type: Pin.LayoutType.genericPin,
          title: 'Pin Title',
          tinyIcon: Pin.Icon.Pin
        })
      });
    });

    it.skip('should throw if action is not valid', function (done) {
      assert.throws(function () { pin.addAction(5); });
      done();
    });

    it('should add a new action to the pin', function (done) {
      var newAction = new Pin.Action();
      assert.equal(0, pin.toJSON().actions.length);
      pin.addAction(newAction);
      assert.equal(1, pin.toJSON().actions.length);
      assert.equal(pin.toJSON().actions[0], newAction);
      done();
    });

    it('should convert an object literal to Action object', function (done) {
      assert.equal(0, pin.toJSON().actions.length);
      pin.addAction({ });
      assert.equal(1, pin.toJSON().actions.length);
      assert.ok(pin.toJSON().actions[0] instanceof Pin.Action);
      done();
    });

  });

});
