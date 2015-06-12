/* global describe */
/* global it */
/* global beforeEach */
/* global afterEach */

var nock = require('nock');
var assert = require('assert');
var Timeline = require('../lib/timeline');

describe('Timeline', function () {
  'use strict';

  var timeline = null;
  var fakePinData = {
    id: '1234',
    time: new Date(),
    layout: new Timeline.Pin.Layout({
      type: 'genericPin',
      title: 'Title',
      tinyIcon: Timeline.Pin.Icon.NOTIFICATION_FLAG
    })
  };
  var fakePin = new Timeline.Pin(fakePinData);
  var rgxUserAgent = /^pebble-api-node\/\d+\.\d+\.\d+;node\/.+/;

  beforeEach(function (done) {
    timeline = new Timeline({ apiRoot: 'http://timeline_api', apiKey: 'API_KEY' });
    done();
  });

  afterEach(function (done) {
    nock.cleanAll();
    done();
  });

  it('should create with no opts passed', function (done) {
    timeline = new Timeline();
    done();
  });

  it('should set the api key', function (done) {
    timeline = new Timeline({ apiKey: 'TEST_KEY' });
    assert.equal(timeline._apiKey, 'TEST_KEY');
    done();
  });

  it('should use the api key env var as a fallback', function (done) {
    process.env.PEBBLE_TIMELINE_API_KEY = 'TEST_KEY';
    timeline = new Timeline();
    assert.equal(timeline._apiKey, 'TEST_KEY');
    delete process.env.PEBBLE_TIMELINE_API_KEY;
    done();
  });

  it('should set the api root', function (done) {
    timeline = new Timeline({ apiRoot: 'TEST_URL' });
    assert.equal(timeline._apiRoot, 'TEST_URL');
    done();
  });

  it('should use the api root env var as a fallback', function (done) {
    process.env.PEBBLE_TIMELINE_API_ROOT = 'TEST_URL';
    timeline = new Timeline();
    assert.equal(timeline._apiRoot, 'TEST_URL');
    delete process.env.PEBBLE_TIMELINE_API_ROOT;
    done();
  });

  it('should use default api root', function (done) {
    timeline = new Timeline();
    assert.equal(timeline._apiRoot, 'https://timeline-api.getpebble.com');
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

    it('should convert the pin argument to a Pin object', function (done) {
      var timelineApi = nock('http://timeline_api', {
        reqheaders: {
          'X-User-Token': 'USER_TOKEN'
        }
      }).put('/v1/user/pins/1234').reply(200);

      timeline.sendUserPin('USER_TOKEN', fakePinData, function (err) {
        assert.equal(err, null);
        timelineApi.done();
        done();
      });
    });

    it('should throw an an error if callback is not a function', function (done) {
      assert.throws(function () { timeline.sendUserPin('USER_TOKEN', fakePin, 5); });
      done();
    });

    it('should send a PUT request to the timeline API', function (done) {
      var timelineApi = nock('http://timeline_api', {
        reqheaders: {
          'X-User-Token': 'USER_TOKEN'
        }
      }).put('/v1/user/pins/1234').reply(200);

      timeline.sendUserPin('USER_TOKEN', fakePin, function (err) {
        assert.equal(err, null);
        timelineApi.done();
        done();
      });
    });

    describe('errors', function () {

      it('return an error if there is a network error', function (done) {
        nock.disableNetConnect();

        timeline.sendUserPin('USER_TOKEN', fakePin, function (err) {
          assert.ok(err instanceof Error);
          done();
        });
      });

      it('should handle a HTTP status of 400', function (done) {
        var timelineApi = nock('http://timeline_api', {
          reqheaders: {
            'X-User-Token': 'USER_TOKEN'
          }
        }).put('/v1/user/pins/1234').reply(400);

        timeline.sendUserPin('USER_TOKEN', fakePin, function (err) {
          assert.ok(err instanceof Error);
          assert.equal(err.message, 'The pin object submitted was invalid.');
          timelineApi.done();
          done();
        });
      });

      it('should handle a HTTP status of 410', function (done) {
        var timelineApi = nock('http://timeline_api', {
          reqheaders: {
            'X-User-Token': 'BAD_USER_TOKEN'
          }
        }).put('/v1/user/pins/1234').reply(410);

        timeline.sendUserPin('BAD_USER_TOKEN', fakePin, function (err) {
          assert.ok(err instanceof Error);
          assert.equal(err.message,
            'The user token submitted was invalid or does not exist.');
          timelineApi.done();
          done();
        });
      });

      it('should handle a HTTP status of 429', function (done) {
        var timelineApi = nock('http://timeline_api', {
          reqheaders: {
            'X-User-Token': 'USER_TOKEN'
          }
        }).put('/v1/user/pins/1234').reply(429);

        timeline.sendUserPin('USER_TOKEN', fakePin, function (err) {
          assert.ok(err instanceof Error);
          assert.equal(err.message, 'Server is sending updates too quickly.');
          timelineApi.done();
          done();
        });
      });

      it('should handle a HTTP status of 503', function (done) {
        var timelineApi = nock('http://timeline_api', {
          reqheaders: {
            'X-User-Token': 'USER_TOKEN'
          }
        }).put('/v1/user/pins/1234').reply(503);

        timeline.sendUserPin('USER_TOKEN', fakePin, function (err) {
          assert.ok(err instanceof Error);
          assert.equal(err.message,
            'Could not save pin due to a temporary server error.');
          timelineApi.done();
          done();
        });
      });

      it('should handle an unknown HTTP status', function (done) {
        var timelineApi = nock('http://timeline_api', {
          reqheaders: {
            'X-User-Token': 'USER_TOKEN'
          }
        }).put('/v1/user/pins/1234').reply(1000);

        timeline.sendUserPin('USER_TOKEN', fakePin, function (err) {
          assert.ok(err instanceof Error);
          assert.equal(err.message, 'Unknown error. Status code: 1000');
          timelineApi.done();
          done();
        });
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

    it('should convert the pin argument to a Pin object', function (done) {
      var timelineApi = nock('http://timeline_api', {
        reqheaders: {
          'X-API-Key': 'API_KEY'
        }
      }).put('/v1/shared/pins/1234').reply(200);

      timeline.sendSharedPin([], fakePinData, function (err) {
        assert.equal(err, null);
        timelineApi.done();
        done();
      });
    });

    it('should send a PUT request to the timeline API', function (done) {
      var timelineApi = nock('http://timeline_api', {
        reqheaders: {
          'X-API-Key': 'API_KEY'
        }
      })
      .matchHeader('user-agent', rgxUserAgent)
      .put('/v1/shared/pins/1234').reply(200);

      timeline.sendSharedPin(['topic1'], fakePin, function (err) {
        assert.equal(err, null);
        timelineApi.done();
        done();
      });
    });

  });

  describe('#deleteUserPin', function() {

    it('should respond with an error if userToken is not a string', function (done) {
      timeline.deleteUserPin(5, fakePin, function (err) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, 'Expected userToken to be a string.');
        done();
      });
    });

    it('should send a DELETE request to the timeline API', function(done) {
      var timelineApi = nock('http://timeline_api', {
        reqheaders: {
          'X-User-Token': 'USER_TOKEN'
        }
      })
      .matchHeader('user-agent', rgxUserAgent)
      .delete('/v1/user/pins/1234').reply(200);

      timeline.deleteUserPin('USER_TOKEN', fakePin, function (err) {
        assert.equal(err, null);
        timelineApi.done();
        done();
      });
    });

    it('should convert the pin argument to a Pin object', function (done) {
      var timelineApi = nock('http://timeline_api', {
        reqheaders: {
          'X-User-Token': 'USER_TOKEN'
        }
      }).delete('/v1/user/pins/1234').reply(200);

      timeline.deleteUserPin('USER_TOKEN', fakePinData, function (err) {
        assert.equal(err, null);
        timelineApi.done();
        done();
      });
    });

  });

  describe('#deleteSharedPin', function() {

    it('should respond with an error if apiKey has not been set', function (done) {
      var badTimeline = new Timeline();
      badTimeline.deleteSharedPin(fakePin, function (err) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, 'API Key not set.');
        done();
      });
    });

    it('should send a DELETE request to the timeline API', function(done) {
      var timelineApi = nock('http://timeline_api', {
        reqheaders: {
          'X-API-Key': 'API_KEY'
        }
      })
      .matchHeader('user-agent', rgxUserAgent)
      .delete('/v1/shared/pins/1234').reply(200);

      timeline.deleteSharedPin(fakePin, function (err) {
        assert.equal(err, null);
        timelineApi.done();
        done();
      });
    });

    it('should convert the pin argument to a Pin object', function (done) {
      var timelineApi = nock('http://timeline_api', {
        reqheaders: {
          'X-API-Key': 'API_KEY'
        }
      }).delete('/v1/shared/pins/1234').reply(200);

      timeline.deleteSharedPin(fakePinData, function (err) {
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
        reqheaders: {
          'X-User-Token': 'USER_TOKEN'
        }
      })
      .matchHeader('user-agent', rgxUserAgent)
      .post('/v1/user/subscriptions/TOPIC').reply(200);

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
        reqheaders: {
          'X-User-Token': 'USER_TOKEN'
        }
      })
      .matchHeader('user-agent', rgxUserAgent)
      .delete('/v1/user/subscriptions/TOPIC').reply(200);

      timeline.unsubscribe('USER_TOKEN', 'TOPIC', function (err) {
        assert.equal(err, null);
        timelineApi.done();
        done();
      });
    });

  });

  describe('#listSubscriptions', function () {

    it('should respond with an error if userToken is not a string', function (done) {
      timeline.listSubscriptions(5, function (err) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, 'Expected userToken to be a string.');
        done();
      });
    });

    it('should send a GET request to the timeline API', function (done) {
      var timelineApi = nock('http://timeline_api', {
        reqheaders: {
          'X-User-Token': 'USER_TOKEN'
        }
      })
      .matchHeader('user-agent', rgxUserAgent)
      .get('/v1/user/subscriptions').reply(200, []);

      timeline.listSubscriptions('USER_TOKEN', function (err) {
        assert.equal(err, null);
        timelineApi.done();
        done();
      });
    });

    it('should respond with an error with failed GET request', function (done) {
      var timelineApi = nock('http://timeline_api', {
        reqheaders: {
          'X-User-Token': 'USER_TOKEN'
        }
      }).get('/v1/user/subscriptions').reply(410);

      timeline.listSubscriptions('USER_TOKEN', function (err) {
        assert.ok(err instanceof Error);
        assert.equal(err.message,
          'The user token submitted was invalid or does not exist.');
        timelineApi.done();
        done();
      });
    });

  });

  describe('#request', function () {

    it('should handle no headers', function (done) {
      var timelineApi = nock('http://timeline_api')
                        .get('/v1/some/endpoint').reply(200, []);

      var opts = {
        method: 'GET',
        endpoint: '/v1/some/endpoint'
      };

      timeline._request(opts, function (err) {
        assert.equal(err, null);
        timelineApi.done();
        done();
      });
    });

  });

});
