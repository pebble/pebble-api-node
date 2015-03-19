/* global describe */
/* global it */

var assert = require('assert');

var Pin = require('../lib/timeline').Pin;
var Notification = require('../lib/timeline').Pin.Notification;
var Layout = require('../lib/timeline').Pin.Layout;

describe('Notification', function () {
  'use strict';
  
  var fakeLayouData = {
    type: Pin.LayoutType.genericPin,
    title: 'Pin Title',
    tinyIcon: Pin.Icon.Pin  
  };
  var fakeLayout = new Layout(fakeLayouData);
  
  it('should throw an error if time is not a Date object', function (done) {
    assert.throws(function () { new Notification({ time: 5, layout: fakeLayout }); });
    done();
  });
  
  it('should convert the layout option to a Layout object', function (done) {
    var reminder = new Notification({ time: new Date(), layout: fakeLayouData });
    assert.ok(reminder.toJSON().layout instanceof Layout);
    done();
  });
  
  it('should be happy with a time and layout', function (done) {
    new Notification({ time: new Date(), layout: fakeLayout });
    done();
  });
  
});
