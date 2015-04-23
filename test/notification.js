/* global describe */
/* global it */

var assert = require('assert');

var Pin = require('../lib/timeline').Pin;
var Notification = require('../lib/timeline').Pin.Notification;
var Layout = require('../lib/timeline').Pin.Layout;

describe('Notification', function () {
  'use strict';

  var fakeLayouData = {
    type: Pin.LayoutType.GENERIC_PIN,
    title: 'Pin Title',
    tinyIcon: Pin.Icon.NOTIFICATION_FLAG
  };
  var fakeLayout = new Layout(fakeLayouData);

  it('should throw an error if time is not a Date object', function (done) {
    var notificationData = { time: 5, layout: fakeLayout };
    assert.throws(function () { new Notification(notificationData); });
    done();
  });

  it('should convert the layout option to a Layout object', function (done) {
    var notificationData = { time: new Date(), layout: fakeLayouData };
    var notification = new Notification(notificationData);
    assert.ok(notification.layout instanceof Layout);
    done();
  });

  it('should be happy with a time and layout', function (done) {
    new Notification({ time: new Date(), layout: fakeLayout });
    done();
  });

  it('should throw an error if layout is not set', function (done) {
    assert.throws(function () { new Notification(); });
    done();
  });

});
