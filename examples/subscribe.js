var Timeline = require('../index');

var timeline = new Timeline;

var userToken = 'TIMELINETEST_USER1';

var topic = [
  'watches',
  'sports'
];

// subscribe the user to topics
timeline.subscribe(userToken, topics, function (err, body) {
  if (err) {
    return console.error(err);
  }

  console.log(body);
});
