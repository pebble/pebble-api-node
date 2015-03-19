'use strict';

var Timeline = require('../index');

var timeline = new Timeline();

var userToken = 'TIMELINETEST_USER1';

var topics = [
  'watches',
  'sports'
];

// unsubscribe the user from topics
timeline.unsubscribe(userToken, topics, function (err, body) {
  if (err) {
    return console.error(err);
  }

  console.log(body);
});
