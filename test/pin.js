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
    tinyIcon: Pin.Icon.PIN
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
          tinyIcon: Pin.Icon.BULB
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
        tinyIcon: Pin.Icon.PIN
      }),
      createNotification: new Pin.Notification({
        layout: {
          type: 'genericReminder',
          title: 'Title',
          tinyIcon: Pin.Icon.CALENDAR
        }
      }),
      updateNotification: new Pin.Notification({
        time: new Date(),
        layout: {
          type: 'genericReminder',
          title: 'Title',
          tinyIcon: Pin.Icon.BULB
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
            tinyIcon: Pin.Icon.PIN
          })
        })
      ],
    });
    assert.equal(pin.opts.time, now);
    assert.equal(pin.opts.duration, 1000);
    assert.equal(pin.opts.id, 'ABCDEF');
    done();
  });

  it('should convert layout to a Layout object', function (done) {
    var pin  = new Pin({
      time: new Date(),
      layout: {
        type: 'genericPin',
        title: 'Title',
        tinyIcon: Pin.Icon.PIN
      },
    });
    assert.ok(pin.opts.layout instanceof Pin.Layout);
    done();
  });

  it('should convert createNotification to a Notification object', function (done) {
    var pin  = new Pin({
      time: new Date(),
      layout: new Pin.Layout({
        type: 'genericPin',
        title: 'Title',
        tinyIcon: Pin.Icon.FOOTBALL
      }),
      createNotification: {
        layout: {
          type: 'genericReminder',
          title: 'Title',
          tinyIcon: Pin.Icon.PIN
        }
      },
    });
    assert.ok(pin.opts.createNotification instanceof Pin.Notification);
    done();
  });

  it('should convert updateNotification to a Notification object', function (done) {
    var pin  = new Pin({
      time: new Date(),
      layout: new Pin.Layout({
        type: 'genericPin',
        title: 'Title',
        tinyIcon: Pin.Icon.SUN
      }),
      updateNotification: {
        time: new Date(),
        layout: {
          type: 'genericReminder',
          title: 'Title',
          tinyIcon: Pin.Icon.ALARM
        }
      },
    });
    assert.ok(pin.opts.updateNotification instanceof Pin.Notification);
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
          tinyIcon: Pin.Icon.PIN
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
          tinyIcon: Pin.Icon.PIN
        })
      });
      assert.equal(0, pin.opts.reminders.length);
      pin.addReminder(newReminder);
      assert.equal(1, pin.opts.reminders.length);
      assert.equal(pin.opts.reminders[0], newReminder);
      done();
    });

    it('should convert an object literal to Reminder object', function (done) {
      assert.equal(0, pin.opts.reminders.length);
      pin.addReminder({
        time: new Date(),
        layout: new Pin.Layout({
          type: 'genericReminder',
          title: 'Title',
          tinyIcon: Pin.Icon.PIN
        })
      });
      assert.equal(1, pin.opts.reminders.length);
      assert.ok(pin.opts.reminders[0] instanceof Pin.Reminder);
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
          tinyIcon: Pin.Icon.PIN
        })
      });
    });

    it('should throw if action is not valid', function (done) {
      assert.throws(function () { pin.addAction(5); });
      done();
    });

    it('should add a new action to the pin', function (done) {
      var newAction = new Pin.Action({ type: Pin.ActionType.OPEN_WATCH_APP });
      assert.equal(0, pin.opts.actions.length);
      pin.addAction(newAction);
      assert.equal(1, pin.opts.actions.length);
      assert.equal(pin.opts.actions[0], newAction);
      done();
    });

    it('should convert an object literal to Action object', function (done) {
      assert.equal(0, pin.opts.actions.length);
      pin.addAction({ type: Pin.ActionType.OPEN_WATCH_APP });
      assert.equal(1, pin.opts.actions.length);
      assert.ok(pin.opts.actions[0] instanceof Pin.Action);
      done();
    });

  });

});
