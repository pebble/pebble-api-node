'use strict';

/**
 * Layout
 *
 * @constructor
 * @param {Object} [opts]
 */
var Layout = module.exports = function (opts) {

  this._layout = new _Layout();

  if (opts && opts.type) {
    if (typeof opts.type !== 'string') {
      throw new Error('Expected type to be a string.');
    }
    this._layout.type = opts.type;
  }

  if (opts && opts.title) {
    if (typeof opts.title !== 'string') {
      throw new Error('Expected title to be a string.');
    }
    this._layout.title = opts.title;
  }

  if (opts && opts.shortTitle) {
    if (typeof opts.shortTitle !== 'string') {
      throw new Error('Expected shortTitle to be a string.');
    }
    this._layout.shortTitle = opts.shortTitle;
  }

  if (opts && opts.subtitle) {
    if (typeof opts.subtitle !== 'string') {
      throw new Error('Expected subtitle to be a string.');
    }
    this._layout.subtitle = opts.subtitle;
  }

  if (opts && opts.body) {
    if (typeof opts.body !== 'string') {
      throw new Error('Expected body to be a string.');
    }
    this._layout.body = opts.body;
  }

  if (opts && opts.tinyIcon) {
    if (typeof opts.tinyIcon !== 'string') {
      throw new Error('Expected tinyIcon to be a string.');
    }
    this._layout.tinyIcon = opts.tinyIcon;
  }

  if (opts && opts.smallIcon) {
    if (typeof opts.smallIcon !== 'string') {
      throw new Error('Expected smallIcon to be a string.');
    }
    this._layout.smallIcon = opts.smallIcon;
  }

  if (opts && opts.largeIcon) {
    if (typeof opts.largeIcon !== 'string') {
      throw new Error('Expected largeIcon to be a string.');
    }
    this._layout.largeIcon = opts.largeIcon;
  }

  if (opts && opts.locationName) {
    if (typeof opts.locationName !== 'string') {
      throw new Error('Expected locationName to be a string.');
    }
    this._layout.locationName = opts.locationName;
  }

  if (opts && opts.sender) {
    if (typeof opts.sender !== 'string') {
      throw new Error('Expected sender to be a string.');
    }
    this._layout.sender = opts.sender;
  }

  if (opts && opts.broadcaster) {
    if (typeof opts.broadcaster !== 'string') {
      throw new Error('Expected broadcaster to be a string.');
    }
    this._layout.broadcaster = opts.broadcaster;
  }

  if (opts && opts.rankAway) {
    if (typeof opts.rankAway !== 'string') {
      throw new Error('Expected rankAway to be a string.');
    }
    this._layout.rankAway = opts.rankAway;
  }

  if (opts && opts.rankHome) {
    if (typeof opts.rankHome !== 'string') {
      throw new Error('Expected rankHome to be a string.');
    }
    this._layout.rankHome = opts.rankHome;
  }

  if (opts && opts.nameAway) {
    if (typeof opts.nameAway !== 'string') {
      throw new Error('Expected nameAway to be a string.');
    }
    this._layout.nameAway = opts.nameAway;
  }

  if (opts && opts.nameHome) {
    if (typeof opts.nameHome !== 'string') {
      throw new Error('Expected nameHome to be a string.');
    }
    this._layout.nameHome = opts.nameHome;
  }

  if (opts && opts.recordAway) {
    if (typeof opts.recordAway !== 'string') {
      throw new Error('Expected recordAway to be a string.');
    }
    this._layout.recordAway = opts.recordAway;
  }

  if (opts && opts.recordHome) {
    if (typeof opts.recordHome !== 'string') {
      throw new Error('Expected recordHome to be a string.');
    }
    this._layout.recordHome = opts.recordHome;
  }

  if (opts && opts.scoreAway) {
    if (typeof opts.scoreAway !== 'string') {
      throw new Error('Expected scoreAway to be a string.');
    }
    this._layout.scoreAway = opts.scoreAway;
  }

  if (opts && opts.scoreHome) {
    if (typeof opts.scoreHome !== 'string') {
      throw new Error('Expected scoreHome to be a string.');
    }
    this._layout.scoreHome = opts.scoreHome;
  }

  if (opts && opts.sportsGameState) {
    if (typeof opts.sportsGameState !== 'string') {
      throw new Error('Expected sportsGameState to be a string.');
    }
    this._layout.sportsGameState = opts.sportsGameState;
  }

  switch (this._layout.type) {
    case 'genericPin':
      if (!this._layout.title) {
        throw new Error('`title` is required by a genericPin Layout.');
      }
      if (!this._layout.tinyIcon) {
        throw new Error('`tinyIcon` is required by a genericPin Layout.');
      }
      break;

    case 'calendarPin':
      if (!this._layout.title) {
        throw new Error('`title` is required by a calendarPin Layout.');
      }
      break;

    case 'genericReminder':
      if (!this._layout.title) {
        throw new Error('`title` is required by a genericReminder Layout.');
      }
      if (!this._layout.tinyIcon) {
        throw new Error('`tinyIcon` is required by a genericReminder Layout.');
      }
      break;

    case 'genericNotification':
      if (!this._layout.title) {
        throw new Error('`title` is required by a genericNotification Layout.');
      }
      if (!this._layout.tinyIcon) {
        throw new Error('`tinyIcon` is required by a genericNotification Layout.');
      }
      break;

    case 'commNotification':
      if (!this._layout.title) {
        throw new Error('`title` is required by a commNotification Layout.');
      }
      if (!this._layout.tinyIcon) {
        throw new Error('`tinyIcon` is required by a commNotification Layout.');
      }
      if (!this._layout.sender) {
        throw new Error('`sender` is required by a commNotification Layout.');
      }
      break;

    case 'weatherPin':
      if (!this._layout.title) {
        throw new Error('`title` is required by a weatherPin Layout.');
      }
      if (!this._layout.tinyIcon) {
        throw new Error('`tinyIcon` is required by a weatherPin Layout.');
      }
      if (!this._layout.largeIcon) {
        throw new Error('`largeIcon` is required by a weatherPin Layout.');
      }
      if (!this._layout.locationName) {
        throw new Error('`locationName` is required by a weatherPin Layout.');
      }
      break;
  }
};

/**
 * Get the Layout JSON Object
 *
 * @return {Object} Layout
 */
Layout.prototype.inspect =
Layout.prototype.toJSON = function () {
  return this._layout;
};

function _Layout () {
}
