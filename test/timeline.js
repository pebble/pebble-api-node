var should = require('should');
var nock = require('nock');
var Timeline = require('../lib/timeline');

describe('Timeline', function () {
  // 
  // var timeline = null;
  // 
  // beforeEach(function (done) {
  //   timeline = new Timeline({ apiRoot: 'http://timeline_api' });
  //   done();
  // });
  // 
  // describe('#setApiKey', function () {
  //   var timelineApi = null;
  //   
  //   beforeEach(function (done) {
  //     timelineApi = nock('http://timeline_api', { reqheaders: { 'X-API-Key': 'ABCDEF' } }).put('/v1/shared/pins/1').reply(200);
  //     done();
  //   });
  //   
  //   it('should set the API key', function (done) {
  //     timeline.setApiKey('ABCDEF');
  //     timeline.sendSharedPin(['topic1'], new Timeline.Pin({ id: '1' }), function (err) {
  //       if (err) {
  //         return done(err);
  //       }
  //       timelineApi.done();
  //       done();
  //     });
  //   });
  //   
  // });
  // 
  // describe('#setApiRoot', function () {
  //   var timelineApi = null;
  //   
  //   beforeEach(function (done) {
  //     timelineApi = nock('http://other_timeline_api').put('/v1/shared/pins/1').reply(200);
  //     timeline.setApiKey('ABCDEF');
  //     done();
  //   });
  //   
  //   it('should set the API root URL', function (done) {
  //     timeline.setApiRoot('http://other_timeline_api');
  //     timeline.sendSharedPin(['topic1'], new Timeline.Pin({ id: '1' }), function (err) {
  //       if (err) {
  //         return done(err);
  //       }
  //       timelineApi.done();
  //       done();
  //     });
  //   });
  //   
  // });
  // 
});
