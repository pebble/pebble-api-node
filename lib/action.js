'use strict';

/**
 * Action
 *
 * @constructor
 * @param {Object} [opts]
 */
var Action = module.exports = function (opts) {

  this._action = new _Action();

  if (opts && opts.title) {
    if (typeof opts.title !== 'string') {
      throw new Error('Expected title to be a string.');
    }
    this._action.title = opts.title;
  }

  if (opts && opts.type) {
    if (typeof opts.type !== 'string') {
      throw new Error('Expected type to be a string.');
    }
    this._action.type = opts.type;
  }

  if (opts && opts.launchCode) {
    if (typeof opts.launchCode !== 'number') {
      throw new Error('Expected launchCode to be a number.');
    }
    this._action.launchCode = opts.launchCode;
  }
};

/**
 * Get the action object
 *
 * @return {Object} _action
 */
Action.prototype.inspect =
Action.prototype.toJSON = function () {
  return this._action;
};

function _Action (opts) {
  // add required params here
}
