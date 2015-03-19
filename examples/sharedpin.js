'use strict';

var Timeline = require('../index');

var timeline = new Timeline({
  apiKey: 'TIMELINETEST_KEY1'
});

// set topics
var topics = ['parties'];

var now = new Date();

var pinTime = new Date(now.getTime() + (30 * 60 * 1000));

// create a new pin
var pin1 = new Timeline.Pin({
  id: 'test-pin-5246',
  time: pinTime,
  duration: 10,
  layout: {
    type: Timeline.Pin.LayoutType.genericPin,
    tinyIcon: Timeline.Pin.Icon.Pin,
    title: 'Pin Title'
  }
}).addReminder(new Timeline.Pin.Reminder({
  time: new Date(pinTime.getTime() - (20 * 60 * 1000)),
  layout: new Timeline.Pin.Layout({
    type: Timeline.Pin.LayoutType.genericReminder,
    tinyIcon: Timeline.Pin.Icon.Calendar,
    title: 'T-20 minutes'
  })
})).addReminder(new Timeline.Pin.Reminder({
  time: new Date(pinTime.getTime() - (10 * 60 * 1000)),
  layout: new Timeline.Pin.Layout({
    type: Timeline.Pin.LayoutType.genericReminder,
    tinyIcon: Timeline.Pin.Icon.Calendar,
    title: 'T-10 minutes'
  })
})).addAction(new Timeline.Pin.Action({
  title: 'Action1',
  type: Timeline.Pin.ActionType.openWatchApp,
  launchCode: 518
})).addAction(new Timeline.Pin.Action({
  title: 'Action2',
  type: Timeline.Pin.ActionType.openWatchApp,
  launchCode: 2
}));

// log the pin object
// console.log(JSON.stringify(pin1, null, 2));

// send the pin
timeline.sendSharedPin(topics, pin1, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('Pin sent successfully!');
});
