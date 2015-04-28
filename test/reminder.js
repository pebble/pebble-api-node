/* global describe */
/* global it */

var assert = require('assert');

var Pin = require('../lib/timeline').Pin;
var Reminder = require('../lib/timeline').Pin.Reminder;
var Layout = require('../lib/timeline').Pin.Layout;

describe('Reminder', function () {
  'use strict';

  var fakeLayouData = {
    type: Pin.LayoutType.GENERIC_PIN,
    title: 'Pin Title',
    tinyIcon: Pin.Icon.NOTIFICATION_FLAG
  };
  var fakeLayout = new Layout(fakeLayouData);

  it('should throw an error if time is not a Date object', function (done) {
    assert.throws(function () { new Reminder({ time: 5, layout: fakeLayout }); });
    done();
  });

  it('should convert the layout option to a Layout object', function (done) {
    var reminder = new Reminder({ time: new Date(), layout: fakeLayouData });
    assert.ok(reminder.layout instanceof Layout);
    done();
  });

  it('should be happy with a time and layout', function (done) {
    new Reminder({ time: new Date(), layout: fakeLayout });
    done();
  });

});
