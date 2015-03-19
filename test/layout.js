/* global describe */
/* global it */

var assert = require('assert');

var Pin = require('../lib/timeline').Pin;
var Layout = Pin.Layout;

describe('Layout', function () {
  'use strict';

  it('should throw if options argument is not an object literal', function (done) {
    assert.throws(function () { new Layout(5); });
    done();
  });

  it('should throw if type is not a string', function (done) {
    var layoutData = {
      type: 5,
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if type is not provided', function (done) {
    var layoutData = {
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if type is not a valid layout type', function (done) {
    var layoutData = {
      type: 'NOT A LAYOUT'
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if title is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.genericPin,
      title: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if shortTitle is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.genericPin,
      shortTitle: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if subtitle is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.genericPin,
      subtitle: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if body is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.genericPin,
      body: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if tinyIcon is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.genericPin,
      tinyIcon: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if smallIcon is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.genericPin,
      smallIcon: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if largeIcon is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.genericPin,
      largeIcon: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if locationName is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.genericPin,
      locationName: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if sender is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.genericPin,
      sender: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if broadcaster is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.genericPin,
      broadcaster: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if rankAway is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.genericPin,
      rankAway: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if rankHome is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.genericPin,
      rankHome: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if nameAway is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.genericPin,
      nameAway: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if nameHome is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.genericPin,
      nameHome: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if recordAway is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.genericPin,
      recordAway: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if recordHome is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.genericPin,
      recordHome: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if scoreAway is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.genericPin,
      scoreAway: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if scoreHome is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.genericPin,
      scoreHome: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if sportsGameState is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.genericPin,
      sportsGameState: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  describe('genericPin', function () {

    it('should throw an error if title is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.genericPin,
        tinyIcon: Pin.Icon.Pin
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should throw an error if tinyIcon is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.genericPin,
        title: 'Pin Title'
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should create a valid genericPin Layout', function (done) {
      var layoutData = {
        type: Pin.LayoutType.genericPin,
        title: 'Pin Title',
        tinyIcon: Pin.Icon.Pin
      };
      new Layout(layoutData);
      done();
    });

  });

  describe('calendarPin', function () {

    it('should throw an error if title is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.calendarPin
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should create a valid genericPin Layout', function (done) {
      var layoutData = {
        type: Pin.LayoutType.calendarPin,
        title: 'Pin Title'
      };
      new Layout(layoutData);
      done();
    });

  });

  describe('sportsPin', function () {

    it('should throw an error if title is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.sportsPin,
        tinyIcon: Pin.Icon.Pin,
        largeIcon: Pin.Icon.Pin
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should throw an error if tinyIcon is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.sportsPin,
        title: 'Pin Title',
        largeIcon: Pin.Icon.Pin
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should throw an error if largeIcon is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.sportsPin,
        title: 'Pin Title',
        tinyIcon: Pin.Icon.Pin
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should create a valid sportsPin Layout', function (done) {
      var layoutData = {
        type: Pin.LayoutType.sportsPin,
        title: 'Bulls at Bears',
        subtitle: 'Halftime',
        body: 'Game of the Century',
        tinyIcon: Pin.Icon.Football,
        largeIcon: Pin.Icon.Football,
        lastUpdated: new Date(),
        rankAway: '03',
        rankHome: '08',
        nameAway: 'POR',
        nameHome: 'LAC',
        recordAway: '39-19',
        recordHome: '39-21',
        scoreAway: '54',
        scoreHome: '49',
        sportsGameState: 'in-game',
        broadcaster: 'ESPN'
      }
      new Layout(layoutData);
      done();
    });

  });

  describe('weatherPin', function () {

    it('should throw an error if title is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.weatherPin,
        tinyIcon: Pin.Icon.Pin,
        largeIcon: Pin.Icon.Pin,
        locationName: 'Somewhere'
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should throw an error if tinyIcon is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.weatherPin,
        title: 'Pin Title',
        largeIcon: Pin.Icon.Pin,
        locationName: 'Somewhere'
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should throw an error if largeIcon is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.weatherPin,
        title: 'Pin Title',
        tinyIcon: Pin.Icon.Pin,
        locationName: 'Somewhere'
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should throw an error if locationName is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.weatherPin,
        title: 'Pin Title',
        tinyIcon: Pin.Icon.Pin,
        largeIcon: Pin.Icon.Pin
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should create a valid weatherPin Layout', function (done) {
      var layoutData = {
        type: Pin.LayoutType.weatherPin,
        title: 'Pin Title',
        tinyIcon: Pin.Icon.Pin,
        largeIcon: Pin.Icon.Pin,
        locationName: 'Somewhere'
      };
      new Layout(layoutData);
      done();
    });

  });

  describe('genericReminder', function () {

    it('should throw an error if title is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.genericReminder,
        title: 'Pin Title'
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should throw an error if tinyIcon is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.genericReminder,
        tinyIcon: Pin.Icon.Pin
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should create a valid genericReminder Layout', function (done) {
      var layoutData = {
        type: Pin.LayoutType.genericReminder,
        title: 'Pin Title',
        tinyIcon: Pin.Icon.Pin
      };
      new Layout(layoutData);
      done();
    });

  });

  describe('genericNotification', function () {

    it('should throw an error if title is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.genericNotification,
        title: 'Pin Title'
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should throw an error if tinyIcon is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.genericNotification,
        tinyIcon: Pin.Icon.Pin
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should create a valid genericNotification Layout', function (done) {
      var layoutData = {
        type: Pin.LayoutType.genericNotification,
        title: 'Pin Title',
        tinyIcon: Pin.Icon.Pin
      };
      new Layout(layoutData);
      done();
    });

  });

  describe('commNotification', function () {

    it('should throw an error if title is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.commNotification,
        tinyIcon: Pin.Icon.Pin,
        sender: 'Someone!'
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should throw an error if tinyIcon is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.commNotification,
        title: 'Pin Title',
        sender: 'Someone!'
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should throw an error if sender is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.commNotification,
        title: 'Pin Title',
        tinyIcon: Pin.Icon.Pin,
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should create a valid commNotification Layout', function (done) {
      var layoutData = {
        type: Pin.LayoutType.commNotification,
        title: 'Pin Title',
        tinyIcon: Pin.Icon.Pin,
        sender: 'Someone!'
      };
      new Layout(layoutData);
      done();
    });

  });

  it('should create a valid Layout with many attributes', function (done) {
    var layoutData = {
      type: Pin.LayoutType.genericPin,
      title: 'Pin Title',
      subtitle: 'Pin Subtitle',
      shortTitle: 'Pin Short Title',
      body: 'Pin Body',
      tinyIcon: Pin.Icon.Pin,
      smallIcon: Pin.Icon.Pin,
      largeIcon: Pin.Icon.Pin
    };
    var layout = new Layout(layoutData);
    assert.deepEqual(layout.toJSON(), layoutData);
    done();
  });

});
