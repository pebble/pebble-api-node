'use strict';

var Timeline = require('../index');

var timeline = new Timeline();

var now = new Date();

var pin1 = new Timeline.Pin({
  id: 'test-pin-5245',
  time: now,
  duration: 10,
  layout: {
    type: Timeline.Pin.LayoutType.genericPin,
    tinyIcon: Timeline.Pin.Icon.Pin,
    title: 'Pin Title'
  }
}).addReminder(new Timeline.Pin.Reminder({
  time: new Date(now.getTime() - 60*60000),
  layout: new Timeline.Pin.Layout({
    type: Timeline.Pin.LayoutType.genericReminder,
    tinyIcon: Timeline.Pin.Icon.Calendar,
    title: 'T-60 minutes'
  })
})).addReminder({
  time: new Date(now.getTime() - 10*60000),
  layout: new Timeline.Pin.Layout({
    type: Timeline.Pin.LayoutType.genericReminder,
    tinyIcon: Timeline.Pin.Icon.Calendar,
    title: 'T-10 minutes'
  })
}).addAction(new Timeline.Pin.Action({
  title: 'Action1',
  type: Timeline.Pin.ActionType.openWatchApp,
  launchCode: 8
})).addAction(new Timeline.Pin.Action({
  title: 'Action2',
  type: Timeline.Pin.ActionType.openWatchApp,
  launchCode: 13
}));

// log the pin object
// console.log(pin1);

// send the pin
timeline.sendUserPin('TIMELINETEST_USER1', pin1, function (err, body) {
  if (err) {
    return console.error(err);
  }

  console.log(body);
});
