'use strict';

var Timeline = require('../index');

var timeline = new Timeline();

var userToken = 'TIMELINETEST_USER1';

var topic = 'sports';

// subscribe the user to the sports topic
timeline.subscribe(userToken, topic, function (err, body) {
  if (err) {
    return console.error(err);
  }

  console.log(body);
});
