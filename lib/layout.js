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

function _Layout (opts) {
  // add required params here
}
