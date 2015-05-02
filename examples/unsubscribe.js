'use strict';

var Timeline = require('../index').Timeline;

var timeline = new Timeline();

var userToken = 'TIMELINETEST_USER1';

var topic = 'sports';

// unsubscribe the user from the sports topic
timeline.unsubscribe(userToken, topic, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('Successfuly unsubscribed from topic!');
});
