'use strict';

var Timeline = require('../index').Timeline;

var timeline = new Timeline();

var userToken = 'TIMELINETEST_USER1';

var topic = 'sports';

// subscribe the user to the sports topic
timeline.subscribe(userToken, topic, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('Successfuly subscribed to topic!');
});
