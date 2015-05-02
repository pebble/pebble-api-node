# pebble-api-node

A Node API library for the [Pebble timeline API](https://developer.getpebble.com/guides/timeline/).

[![Build Status](https://travis-ci.org/pebble/pebble-api-node.svg?branch=master)](https://travis-ci.org/pebble/pebble-api-node)
[![Coverage Status](https://img.shields.io/coveralls/pebble/pebble-api-node.svg)](https://coveralls.io/r/pebble/pebble-api-node)
[![npm](http://img.shields.io/npm/v/pebble-api.svg)](https://www.npmjs.org/package/pebble-api)

```js
var Timeline = require('pebble-api').Timeline;

var timeline = new Timeline();

var userToken = '831ac9f096134d8f841b63bb5e80bda3';

var pin = new Timeline.Pin({
  id: 'test-pin-5245',
  time: new Date(),
  duration: 10,
  layout: new Timeline.Pin.Layout({
    type: Timeline.Pin.LayoutType.GENERIC_PIN,
    tinyIcon: Timeline.Pin.Icon.NOTIFICATION_FLAG,
    title: 'Pin Title'
  })
});

timeline.sendUserPin(userToken, pin, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('Pin sent successfully!');
});

```

### Installation

```
npm install pebble-api --save
```

### Examples

We have some example apps to demonstrate different uses of the library. You can find them in the [examples folder](./examples).

### Development

#### Running Tests

- `make test` runs tests
- `make test-cov` runs tests + test coverage
- `make open-cov` opens test coverage results in your browser

## Sponsored by

[Pebble Technology!](https://getpebble.com)

## License

[MIT](./LICENSE)
