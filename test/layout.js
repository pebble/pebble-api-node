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
      type: Pin.LayoutType.GENERIC_PIN,
      title: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if shortTitle is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      shortTitle: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if subtitle is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      subtitle: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if body is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      body: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if tinyIcon is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      tinyIcon: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if smallIcon is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      smallIcon: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if largeIcon is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      largeIcon: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if foregroundColor is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      foregroundColor: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if primaryColor is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      primaryColor: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if secondaryColor is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      secondaryColor: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if backgroundColor is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      backgroundColor: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if headings is not an array', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      headings: 5,
      paragraphs: ['some text']
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if headings array contains non-strings', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      headings: [5],
      paragraphs: ['some text']
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if paragraphs is not an array', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      headings: ['heading1'],
      paragraphs: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if paragraphs array contains non-strings', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      headings: ['heading1'],
      paragraphs: [5]
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if headings is not set but paragraphs is', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      paragraphs: ['some text']
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if paragraphs is not set but headings is', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      headings: ['heading1']
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if number of paragraphs does not equal number of headings',
      function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      headings: ['heading1', 'heading2'],
      paragraphs: ['some text']
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if lastUpdated is not a Date object', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      lastUpdated: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if locationName is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      locationName: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if sender is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      sender: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if broadcaster is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      broadcaster: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if rankAway is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      rankAway: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if rankHome is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      rankHome: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if nameAway is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      nameAway: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if nameHome is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      nameHome: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if recordAway is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      recordAway: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if recordHome is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      recordHome: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if scoreAway is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      scoreAway: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if scoreHome is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      scoreHome: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  it('should throw if sportsGameState is not a string', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      sportsGameState: 5
    };
    assert.throws(function () { new Layout(layoutData); });
    done();
  });

  describe('genericPin', function () {

    it('should throw an error if title is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.GENERIC_PIN,
        tinyIcon: Pin.Icon.NOTIFICATION_FLAG
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should throw an error if tinyIcon is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.GENERIC_PIN,
        title: 'Pin Title'
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should create a valid genericPin Layout', function (done) {
      var layoutData = {
        type: Pin.LayoutType.GENERIC_PIN,
        title: 'Pin Title',
        tinyIcon: Pin.Icon.NOTIFICATION_FLAG,
        backgroundColor: '#222222',
        foregroundColor: '#445566',
        secondaryColor: '#000000',
      };
      new Layout(layoutData);
      done();
    });

  });

  describe('calendarPin', function () {

    it('should throw an error if title is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.CALENDAR_PIN
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should create a valid genericPin Layout', function (done) {
      var layoutData = {
        type: Pin.LayoutType.CALENDAR_PIN,
        title: 'Pin Title',
        headings: ['heading1', 'heading2'],
        paragraphs: ['paragraph1', 'paragraph2'],
        backgroundColor: '#222222',
        primaryColor: '#445566',
        secondaryColor: '#000000',
      };
      new Layout(layoutData);
      done();
    });

  });

  describe('sportsPin', function () {

    it('should throw an error if title is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.SPORTS_PIN,
        tinyIcon: Pin.Icon.NOTIFICATION_FLAG,
        largeIcon: Pin.Icon.NOTIFICATION_FLAG
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should throw an error if tinyIcon is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.SPORTS_PIN,
        title: 'Pin Title',
        largeIcon: Pin.Icon.NOTIFICATION_FLAG
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should throw an error if largeIcon is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.SPORTS_PIN,
        title: 'Pin Title',
        tinyIcon: Pin.Icon.NOTIFICATION_FLAG
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should create a valid sportsPin Layout', function (done) {
      var layoutData = {
        type: Pin.LayoutType.SPORTS_PIN,
        title: 'Bulls at Bears',
        subtitle: 'Halftime',
        body: 'Game of the Century',
        tinyIcon: Pin.Icon.AMERICAN_FOOTBALL,
        largeIcon: Pin.Icon.AMERICAN_FOOTBALL,
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
      };
      new Layout(layoutData);
      done();
    });

  });

  describe('weatherPin', function () {

    it('should throw an error if title is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.WEATHER_PIN,
        tinyIcon: Pin.Icon.NOTIFICATION_FLAG,
        largeIcon: Pin.Icon.NOTIFICATION_FLAG,
        locationName: 'Somewhere'
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should throw an error if tinyIcon is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.WEATHER_PIN,
        title: 'Pin Title',
        largeIcon: Pin.Icon.NOTIFICATION_FLAG,
        locationName: 'Somewhere'
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should throw an error if largeIcon is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.WEATHER_PIN,
        title: 'Pin Title',
        tinyIcon: Pin.Icon.NOTIFICATION_FLAG,
        locationName: 'Somewhere'
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should throw an error if locationName is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.WEATHER_PIN,
        title: 'Pin Title',
        tinyIcon: Pin.Icon.NOTIFICATION_FLAG,
        largeIcon: Pin.Icon.NOTIFICATION_FLAG
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should create a valid weatherPin Layout', function (done) {
      var layoutData = {
        type: Pin.LayoutType.WEATHER_PIN,
        title: 'Pin Title',
        tinyIcon: Pin.Icon.NOTIFICATION_FLAG,
        largeIcon: Pin.Icon.NOTIFICATION_FLAG,
        locationName: 'Somewhere'
      };
      new Layout(layoutData);
      done();
    });

  });

  describe('genericReminder', function () {

    it('should throw an error if title is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.GENERIC_REMINDER,
        title: 'Pin Title'
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should throw an error if tinyIcon is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.GENERIC_REMINDER,
        tinyIcon: Pin.Icon.NOTIFICATION_FLAG
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should create a valid genericReminder Layout', function (done) {
      var layoutData = {
        type: Pin.LayoutType.GENERIC_REMINDER,
        title: 'Pin Title',
        tinyIcon: Pin.Icon.NOTIFICATION_FLAG
      };
      new Layout(layoutData);
      done();
    });

  });

  describe('genericNotification', function () {

    it('should throw an error if title is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.GENERIC_NOTIFICATION,
        title: 'Pin Title'
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should throw an error if tinyIcon is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.GENERIC_NOTIFICATION,
        tinyIcon: Pin.Icon.NOTIFICATION_FLAG
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should create a valid genericNotification Layout', function (done) {
      var layoutData = {
        type: Pin.LayoutType.GENERIC_NOTIFICATION,
        title: 'Pin Title',
        tinyIcon: Pin.Icon.NOTIFICATION_FLAG
      };
      new Layout(layoutData);
      done();
    });

  });

  describe('commNotification', function () {

    it('should throw an error if title is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.COMM_NOTIFICATION,
        tinyIcon: Pin.Icon.NOTIFICATION_FLAG,
        sender: 'Someone!'
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should throw an error if tinyIcon is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.COMM_NOTIFICATION,
        title: 'Pin Title',
        sender: 'Someone!'
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should throw an error if sender is not provided', function (done) {
      var layoutData = {
        type: Pin.LayoutType.COMM_NOTIFICATION,
        title: 'Pin Title',
        tinyIcon: Pin.Icon.NOTIFICATION_FLAG,
      };
      assert.throws(function () { new Layout(layoutData); });
      done();
    });

    it('should create a valid commNotification Layout', function (done) {
      var layoutData = {
        type: Pin.LayoutType.COMM_NOTIFICATION,
        title: 'Pin Title',
        tinyIcon: Pin.Icon.NOTIFICATION_FLAG,
        sender: 'Someone!'
      };
      new Layout(layoutData);
      done();
    });

  });

  it('should create a valid Layout with many attributes', function (done) {
    var layoutData = {
      type: Pin.LayoutType.GENERIC_PIN,
      title: 'Pin Title',
      subtitle: 'Pin Subtitle',
      shortTitle: 'Pin Short Title',
      body: 'Pin Body',
      tinyIcon: Pin.Icon.NOTIFICATION_FLAG,
      smallIcon: Pin.Icon.NOTIFICATION_FLAG,
      largeIcon: Pin.Icon.NOTIFICATION_FLAG
    };
    var layout = new Layout(layoutData);
    assert.deepEqual(layout, layoutData);
    done();
  });

});
