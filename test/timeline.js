/* global describe */
/* global it */
/* global beforeEach */

var nock = require('nock');
var assert = require('assert');
var Timeline = require('../lib/timeline');

describe('Timeline', function () {
  'use strict';

  var timeline = null;
  var fakePin = new Timeline.Pin({ id: '1234', time: new Date(), layout: new Timeline.Pin.Layout() });

  beforeEach(function (done) {
    timeline = new Timeline({ apiRoot: 'http://timeline_api', apiKey: 'API_KEY' });
    done();
  });

  describe('#sendUserPin', function () {

    it('should respond with an error if userToken is not a string', function (done) {
      timeline.sendUserPin(5, fakePin, function (err) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, 'Expected userToken to be a string.');
        done();
      });
    });

    it.skip('should respond with an error if pin is not a Pin object', function (done) {
      timeline.sendUserPin('USER_TOKEN', {}, function (err) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, 'Invalid Pin.');
        done();
      });
    });

    it('should send a PUT request to the timeline API', function (done) {
      var timelineApi = nock('http://timeline_api', {
        reqheaders: { 'X-User-Token': 'USER_TOKEN' }
      }).put('/v1/user/pins/1234').reply(200);

      timeline.sendUserPin('USER_TOKEN', fakePin, function (err) {
        assert.equal(err, null);
        timelineApi.done();
        done();
      });
    });

  });

  describe('#sendSharedPin', function () {

    it('should respond with an error if apiKey has not been set', function (done) {
      var badTimeline = new Timeline();
      badTimeline.sendSharedPin([], fakePin, function (err) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, 'API Key not set.');
        done();
      });
    });

    it('should respond with an error if topics is not an array', function (done) {
      timeline.sendSharedPin(5, fakePin, function (err) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, 'Expected topics to be an array.');
        done();
      });
    });

    it.skip('should respond with an error if pin is not a Pin object', function (done) {
      timeline.sendSharedPin([], {}, function (err) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, 'Invalid Pin.');
        done();
      });
    });

    it('should send a PUT request to the timeline API', function (done) {
      var timelineApi = nock('http://timeline_api', {
        reqheaders: { 'X-API-Key': 'API_KEY' }
      }).put('/v1/shared/pins/1234').reply(200);

      timeline.sendSharedPin(['topic1'], fakePin, function (err) {
        assert.equal(err, null);
        timelineApi.done();
        done();
      });
    });

  });

  describe('#subscribe', function () {

    it('should respond with an error if userToken is not a string', function (done) {
      timeline.subscribe(5, 'topic', function (err) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, 'Expected userToken to be a string.');
        done();
      });
    });

    it('should respond with an error if topic is not a string', function (done) {
      timeline.subscribe('USER_TOKEN', 5, function (err) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, 'Expected topic to be a string.');
        done();
      });
    });

    it('should send a POST request to the timeline API', function (done) {
      var timelineApi = nock('http://timeline_api', {
          reqheaders: { 'X-User-Token': 'USER_TOKEN' }
        }).post('/v1/user/subscriptions/TOPIC').reply(200);

      timeline.subscribe('USER_TOKEN', 'TOPIC', function (err) {
        assert.equal(err, null);
        timelineApi.done();
        done();
      });
    });

  });

  describe('#unsubscribe', function () {

    it('should respond with an error if userToken is not a string', function (done) {
      timeline.unsubscribe(5, 'topic', function (err) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, 'Expected userToken to be a string.');
        done();
      });
    });

    it('should respond with an error if topic is not a string', function (done) {
      timeline.unsubscribe('USER_TOKEN', 5, function (err) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, 'Expected topic to be a string.');
        done();
      });
    });

    it('should send a DELETE request to the timeline API', function (done) {
      var timelineApi = nock('http://timeline_api', {
        reqheaders: { 'X-User-Token': 'USER_TOKEN' }
      }).delete('/v1/user/subscriptions/TOPIC').reply(200);

      timeline.unsubscribe('USER_TOKEN', 'TOPIC', function (err) {
        assert.equal(err, null);
        timelineApi.done();
        done();
      });
    });

  });

});
