/* global describe */
/* global it */
/* global beforeEach */

var assert = require('assert');

var Pin = require('../lib/timeline').Pin;

describe('Pin', function () {
  'use strict';

  var layout = new Pin.Layout({
    type: Pin.LayoutType.GENERIC_PIN,
    title: 'Pin Title',
    tinyIcon: Pin.Icon.NOTIFICATION_FLAG
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

  it('should throw if updateNotification time is not set', function (done) {
    var pinData = {
      time: new Date(),
      layout: layout,
      updateNotification: new Pin.Notification({
        layout: {
          type: 'genericReminder',
          title: 'Title',
          tinyIcon: Pin.Icon.NOTIFICATION_FLAG
        }
      })
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
        tinyIcon: Pin.Icon.NOTIFICATION_FLAG
      }),
      createNotification: new Pin.Notification({
        layout: {
          type: 'genericReminder',
          title: 'Title',
          tinyIcon: Pin.Icon.TIMELINE_CALENDAR
        }
      }),
      updateNotification: new Pin.Notification({
        time: new Date(),
        layout: {
          type: 'genericReminder',
          title: 'Title',
          tinyIcon: Pin.Icon.TIMELINE_SUN
        }
      }),
      actions: [
        new Pin.Action({ type: Pin.ActionType.OPEN_WATCH_APP })
      ],
      reminders: [
        new Pin.Reminder({
          time: new Date(),
          layout: new Pin.Layout({
            type: 'genericReminder',
            title: 'Title',
            tinyIcon: Pin.Icon.NOTIFICATION_FLAG
          })
        })
      ],
    });
    assert.equal(pin.time, now);
    assert.equal(pin.duration, 1000);
    assert.equal(pin.id, 'ABCDEF');
    done();
  });

  it('should convert layout to a Layout object', function (done) {
    var pin  = new Pin({
      time: new Date(),
      layout: {
        type: 'genericPin',
        title: 'Title',
        tinyIcon: Pin.Icon.NOTIFICATION_FLAG,
        foregoundColor: '#445566',
        backgroundColor: '#222222'
      },
    });
    assert.ok(pin.layout instanceof Pin.Layout);
    done();
  });

  it('should convert createNotification to a Notification object', function (done) {
    var pin  = new Pin({
      time: new Date(),
      layout: new Pin.Layout({
        type: 'genericPin',
        title: 'Title',
        tinyIcon: Pin.Icon.AMERICAN_FOOTBALL
      }),
      createNotification: {
        layout: {
          type: 'genericReminder',
          title: 'Title',
          tinyIcon: Pin.Icon.NOTIFICATION_FLAG
        }
      },
    });
    assert.ok(pin.createNotification instanceof Pin.Notification);
    done();
  });

  it('should convert updateNotification to a Notification object', function (done) {
    var pin  = new Pin({
      time: new Date(),
      layout: new Pin.Layout({
        type: 'genericPin',
        title: 'Title',
        tinyIcon: Pin.Icon.TIMELINE_SUN
      }),
      updateNotification: {
        time: new Date(),
        layout: {
          type: 'genericReminder',
          title: 'Title',
          tinyIcon: Pin.Icon.ALARM_CLOCK
        }
      },
    });
    assert.ok(pin.updateNotification instanceof Pin.Notification);
    done();
  });

  describe('#addReminder', function () {

    var pin;

    beforeEach(function () {
      pin  = new Pin({
        time: new Date(),
        layout: new Pin.Layout({
          type: Pin.LayoutType.GENERIC_PIN,
          title: 'Pin Title',
          tinyIcon: Pin.Icon.NOTIFICATION_FLAG
        })
      });
    });

    it('should throw if reminder is not valid', function (done) {
      assert.throws(function () { pin.addReminder(5); });
      done();
    });

    it('should add a new reminder to the pin', function (done) {
      var newReminder = new Pin.Reminder({
        time: new Date(),
        layout: new Pin.Layout({
          type: 'genericReminder',
          title: 'Title',
          tinyIcon: Pin.Icon.NOTIFICATION_FLAG
        })
      });
      assert.equal(0, pin.reminders.length);
      pin.addReminder(newReminder);
      assert.equal(1, pin.reminders.length);
      assert.equal(pin.reminders[0], newReminder);
      done();
    });

    it('should convert an object literal to Reminder object', function (done) {
      assert.equal(0, pin.reminders.length);
      pin.addReminder({
        time: new Date(),
        layout: new Pin.Layout({
          type: 'genericReminder',
          title: 'Title',
          tinyIcon: Pin.Icon.NOTIFICATION_FLAG
        })
      });
      assert.equal(1, pin.reminders.length);
      assert.ok(pin.reminders[0] instanceof Pin.Reminder);
      done();
    });

  });

  describe('#addAction', function () {

    var pin;

    beforeEach(function () {
      pin  = new Pin({
        time: new Date(),
        layout: new Pin.Layout({
          type: Pin.LayoutType.GENERIC_PIN,
          title: 'Pin Title',
          tinyIcon: Pin.Icon.NOTIFICATION_FLAG
        })
      });
    });

    it('should throw if action is not valid', function (done) {
      assert.throws(function () { pin.addAction(5); });
      done();
    });

    it('should add a new action to the pin', function (done) {
      var newAction = new Pin.Action({ type: Pin.ActionType.OPEN_WATCH_APP });
      assert.equal(0, pin.actions.length);
      pin.addAction(newAction);
      assert.equal(1, pin.actions.length);
      assert.equal(pin.actions[0], newAction);
      done();
    });

    it('should convert an object literal to Action object', function (done) {
      assert.equal(0, pin.actions.length);
      pin.addAction({ type: Pin.ActionType.OPEN_WATCH_APP });
      assert.equal(1, pin.actions.length);
      assert.ok(pin.actions[0] instanceof Pin.Action);
      done();
    });

  });

});
