'use strict';

/**
 * Layout
 *
 * @param {Object} `opts` [optional]
 */
var Layout = module.exports = function (opts) {
  opts = opts || {};

  this._layout = {};

  if (opts.type) {
    this.setType(opts.type);
  }

  if (opts.title) {
    this.setTitle(opts.title);
  }

  if (opts.shortTitle) {
    this.setShortTitle(opts.shortTitle);
  }

  if (opts.subtitle) {
    this.setSubtitle(opts.subtitle);
  }

  if (opts.body) {
    this.setBody(opts.body);
  }

  if (opts.tinyIcon) {
    this.setTinyIcon(opts.tinyIcon);
  }

  if (opts.smallIcon) {
    this.setSmallIcon(opts.smallIcon);
  }

  if (opts.largeIcon) {
    this.setLargeIcon(opts.largeIcon);
  }

  if (opts.locationName) {
    this.setLocationName(opts.locationName);
  }
};

/**
 * Set type
 *
 * @param {String} `type`
 */
Layout.prototype.setType = function (type) {
  this._layout.type = type;
};

/**
 * Set title
 *
 * @param {String} `title`
 */
Layout.prototype.setTitle = function (title) {
  this._layout.title = title;
};

/**
 * Set shortTitle
 *
 * @param {String} `shortTitle`
 */
Layout.prototype.setShortTitle = function (shortTitle) {
  this._layout.shortTitle = shortTitle;
};

/**
 * Set subtitle
 *
 * @param {String} `subtitle`
 */
Layout.prototype.setSubtitle = function (subtitle) {
  this._layout.subtitle = subtitle;
};

/**
 * Set body
 *
 * @param {String} `body`
 */
Layout.prototype.setBody = function (body) {
  this._layout.body = body;
};

/**
 * Set tinyIcon
 *
 * @param {String} `tinyIcon`
 */
Layout.prototype.setTinyIcon = function (tinyIcon) {
  this._layout.tinyIcon = tinyIcon;
};

/**
 * Set smallIcon
 *
 * @param {String} `smallIcon`
 */
Layout.prototype.setSmallIcon = function (smallIcon) {
  this._layout.smallIcon = smallIcon;
};

/**
 * Set largeIcon
 *
 * @param {String} `largeIcon`
 */
Layout.prototype.setLargeIcon = function (largeIcon) {
  this._layout.largeIcon = largeIcon;
};

/**
 * Set locationName
 *
 * @param {String} `locationName`
 */
Layout.prototype.setLocationName = function (locationName) {
  this._layout.locationName = locationName;
};

/**
 * Get the layout object
 *
 * @return {Object} `_layout`
 */
Layout.prototype.getLayout = function () {
  return this._layout;
};
