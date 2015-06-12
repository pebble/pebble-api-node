'use strict';

/**
 * Layout
 *
 * @constructor
 * @param {Object} [opts]
 */
module.exports = function (opts) {

  if (opts && opts.type) {
    if (typeof opts.type !== 'string') {
      throw new Error('Expected type to be a string.');
    }
    this.type = opts.type;
  }

  if (opts && opts.title) {
    if (typeof opts.title !== 'string') {
      throw new Error('Expected title to be a string.');
    }
    this.title = opts.title;
  }

  if (opts && opts.shortTitle) {
    if (typeof opts.shortTitle !== 'string') {
      throw new Error('Expected shortTitle to be a string.');
    }
    this.shortTitle = opts.shortTitle;
  }

  if (opts && opts.subtitle) {
    if (typeof opts.subtitle !== 'string') {
      throw new Error('Expected subtitle to be a string.');
    }
    this.subtitle = opts.subtitle;
  }

  if (opts && opts.body) {
    if (typeof opts.body !== 'string') {
      throw new Error('Expected body to be a string.');
    }
    this.body = opts.body;
  }

  if (opts && opts.tinyIcon) {
    if (typeof opts.tinyIcon !== 'string') {
      throw new Error('Expected tinyIcon to be a string.');
    }
    this.tinyIcon = opts.tinyIcon;
  }

  if (opts && opts.smallIcon) {
    if (typeof opts.smallIcon !== 'string') {
      throw new Error('Expected smallIcon to be a string.');
    }
    this.smallIcon = opts.smallIcon;
  }

  if (opts && opts.largeIcon) {
    if (typeof opts.largeIcon !== 'string') {
      throw new Error('Expected largeIcon to be a string.');
    }
    this.largeIcon = opts.largeIcon;
  }

  if (opts && opts.foregroundColor) {
    if (typeof opts.foregroundColor !== 'string') {
      throw new Error('Expected foregroundColor to be a string.');
    }
    this.foregroundColor = opts.foregroundColor;
  }

  if (opts && opts.primaryColor) {
    if (typeof opts.primaryColor !== 'string') {
      throw new Error('Expected primaryColor to be a string.');
    }
    this.primaryColor = opts.primaryColor;
  }

  if (opts && opts.secondaryColor) {
    if (typeof opts.secondaryColor !== 'string') {
      throw new Error('Expected secondaryColor to be a string.');
    }
    this.secondaryColor = opts.secondaryColor;
  }

  if (opts && opts.backgroundColor) {
    if (typeof opts.backgroundColor !== 'string') {
      throw new Error('Expected backgroundColor to be a string.');
    }
    this.backgroundColor = opts.backgroundColor;
  }

  if (opts && opts.headings) {
    if (!(opts.headings instanceof Array)) {
      throw new Error('Expected headings to be an array.');
    }
    opts.headings.forEach(function (heading) {
      if (typeof heading !== 'string') {
        throw new Error('Expected headings array to contain strings.');
      }
    });
    this.headings = opts.headings;
  }

  if (opts && opts.paragraphs) {
    if (!(opts.paragraphs instanceof Array)) {
      throw new Error('Expected paragraphs to be an array.');
    }
    opts.paragraphs.forEach(function (paragraph) {
      if (typeof paragraph !== 'string') {
        throw new Error('Expected paragraphs array to contain strings.');
      }
    });
    this.paragraphs = opts.paragraphs;
  }

  if (this.headings || this.paragraphs) {
    if (!this.headings) {
      throw new Error('Expected headings as paragraphs is set.');
    }
    if (!this.paragraphs) {
      throw new Error('Expected paragraphs as headings is set.');
    }
    if (this.headings.length !== this.paragraphs.length) {
      throw new Error('Number of headings must equal the number of paragraphs.');
    }
  }

  if (opts && opts.lastUpdated) {
    if (!(opts.lastUpdated instanceof Date)) {
      throw new Error('Expected lastUpdated to be a Date.');
    }
    this.lastUpdated = opts.lastUpdated;
  }

  if (opts && opts.locationName) {
    if (typeof opts.locationName !== 'string') {
      throw new Error('Expected locationName to be a string.');
    }
    this.locationName = opts.locationName;
  }

  if (opts && opts.sender) {
    if (typeof opts.sender !== 'string') {
      throw new Error('Expected sender to be a string.');
    }
    this.sender = opts.sender;
  }

  if (opts && opts.broadcaster) {
    if (typeof opts.broadcaster !== 'string') {
      throw new Error('Expected broadcaster to be a string.');
    }
    this.broadcaster = opts.broadcaster;
  }

  if (opts && opts.rankAway) {
    if (typeof opts.rankAway !== 'string') {
      throw new Error('Expected rankAway to be a string.');
    }
    this.rankAway = opts.rankAway;
  }

  if (opts && opts.rankHome) {
    if (typeof opts.rankHome !== 'string') {
      throw new Error('Expected rankHome to be a string.');
    }
    this.rankHome = opts.rankHome;
  }

  if (opts && opts.nameAway) {
    if (typeof opts.nameAway !== 'string') {
      throw new Error('Expected nameAway to be a string.');
    }
    this.nameAway = opts.nameAway;
  }

  if (opts && opts.nameHome) {
    if (typeof opts.nameHome !== 'string') {
      throw new Error('Expected nameHome to be a string.');
    }
    this.nameHome = opts.nameHome;
  }

  if (opts && opts.recordAway) {
    if (typeof opts.recordAway !== 'string') {
      throw new Error('Expected recordAway to be a string.');
    }
    this.recordAway = opts.recordAway;
  }

  if (opts && opts.recordHome) {
    if (typeof opts.recordHome !== 'string') {
      throw new Error('Expected recordHome to be a string.');
    }
    this.recordHome = opts.recordHome;
  }

  if (opts && opts.scoreAway) {
    if (typeof opts.scoreAway !== 'string') {
      throw new Error('Expected scoreAway to be a string.');
    }
    this.scoreAway = opts.scoreAway;
  }

  if (opts && opts.scoreHome) {
    if (typeof opts.scoreHome !== 'string') {
      throw new Error('Expected scoreHome to be a string.');
    }
    this.scoreHome = opts.scoreHome;
  }

  if (opts && opts.sportsGameState) {
    if (typeof opts.sportsGameState !== 'string') {
      throw new Error('Expected sportsGameState to be a string.');
    }
    this.sportsGameState = opts.sportsGameState;
  }

  if (!this.type) {
    throw new Error('`type` is required by Layout.');
  }

  switch (this.type) {
    case 'genericPin':
      if (!this.title) {
        throw new Error('`title` is required by a genericPin Layout.');
      }
      if (!this.tinyIcon) {
        throw new Error('`tinyIcon` is required by a genericPin Layout.');
      }
      break;

    case 'calendarPin':
      if (!this.title) {
        throw new Error('`title` is required by a calendarPin Layout.');
      }
      break;

    case 'genericReminder':
      if (!this.title) {
        throw new Error('`title` is required by a genericReminder Layout.');
      }
      if (!this.tinyIcon) {
        throw new Error('`tinyIcon` is required by a genericReminder Layout.');
      }
      break;

    case 'genericNotification':
      if (!this.title) {
        throw new Error('`title` is required by a genericNotification Layout.');
      }
      if (!this.tinyIcon) {
        throw new Error('`tinyIcon` is required by a genericNotification Layout.');
      }
      break;

    case 'commNotification':
      if (!this.title) {
        throw new Error('`title` is required by a commNotification Layout.');
      }
      if (!this.tinyIcon) {
        throw new Error('`tinyIcon` is required by a commNotification Layout.');
      }
      if (!this.sender) {
        throw new Error('`sender` is required by a commNotification Layout.');
      }
      break;

    case 'weatherPin':
      if (!this.title) {
        throw new Error('`title` is required by a weatherPin Layout.');
      }
      if (!this.tinyIcon) {
        throw new Error('`tinyIcon` is required by a weatherPin Layout.');
      }
      if (!this.largeIcon) {
        throw new Error('`largeIcon` is required by a weatherPin Layout.');
      }
      if (!this.locationName) {
        throw new Error('`locationName` is required by a weatherPin Layout.');
      }
      break;

    case 'sportsPin':
      if (!this.title) {
        throw new Error('`title` is required by a sportsPin Layout.');
      }
      if (!this.tinyIcon) {
        throw new Error('`tinyIcon` is required by a sportsPin Layout.');
      }
      if (!this.largeIcon) {
        throw new Error('`largeIcon` is required by a sportsPin Layout.');
      }
      break;

    default:
      throw new Error(this.type + ' is not a valid Layout type');
  }
};
