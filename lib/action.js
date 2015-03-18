'use strict';

/**
 * Action
 *
 * @param {Object} `opts` [optional]
 */
var Action = module.exports = function (opts) {
  opts = opts || {};

  this._action = {};

  if (opts.title) {
    this.setTitle(opts.title);
  }

  if (opts.type) {
    this.setType(opts.type);
  }

  if (opts.launchCode) {
    this.setLaunchCode(opts.launchCode);
  }
};

/**
 * Set the title
 *
 * @param {String} `title`
 */
Action.prototype.setTitle = function (title) {
  this._action.title = title;
};

/**
 * Set type
 *
 * @param {String} `type`
 */
Action.prototype.setType = function (type) {
  this._action.type = type;
};

/**
 * Set launchCode
 *
 * @param {Integer} `launchCode`
 */
Action.prototype.setLaunchCode = function (launchCode) {
  this._action.launchCode = launchCode;
};

/**
 * Get the action object
 *
 * @return {Object} `_action`
 */
Action.prototype.getObject = function () {
  return this._action;
};
