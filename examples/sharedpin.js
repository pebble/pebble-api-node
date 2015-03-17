var Timeline = require('../index');

var timeline = new Timeline;

// set timeline api key
timeline.setApiKey('TIMELINETEST_KEY1');

// set topics
var topics = ['parties'];

// create a new pin
var pin1 = new Timeline.Pin();

// set the pin id
pin1.setId('test-pin-5246');

var now = new Date();

// set the time for the pin to show
pin1.setTime(now);

// set the pin duration
pin1.setDuration(10);

// set the pin layout
pin1.setLayout(new Timeline.Pin.Layout({
  type: Timeline.Pin.LayoutType.genericPin,
  title: 'Pin Title'
}));

// add a reminder to the pin
pin1.addReminder(new Timeline.Pin.Reminder({
  time: '2015-03-17 19:00:00',
  layout: new Timeline.Pin.Layout({
    type: Timeline.Pin.LayoutType.genericReminder,
    tinyIcon: Timeline.Pin.Icon.Calendar,
    title: 'T-60 minutes'
  })
}));

// add another reminder to the pin
pin1.addReminder(new Timeline.Pin.Reminder({
  time: '2015-03-17 19:50:00',
  layout: new Timeline.Pin.Layout({
    type: Timeline.Pin.LayoutType.genericReminder,
    tinyIcon: Timeline.Pin.Icon.Calendar,
    title: 'T-10 minutes'
  })
}));

// add an action to the pin
pin1.addAction(new Timeline.Pin.Action({
  title: 'Action1',
  type: Timeline.Pin.ActionType.openWatchApp,
  launchCode: 8
}));

// add another action to the pin
pin1.addAction(new Timeline.Pin.Action({
  title: 'Action2',
  type: Timeline.Pin.ActionType.openWatchApp,
  launchCode: 13
}));

// log the pin object
console.log(pin1);

// send the pin
timeline.sendSharedPin(topics, pin1, function (err, body) {
  if (err) {
    return console.error(err);
  }

  console.log(body);
});
