'use strict';

var Joi = require('joi');

var schema = Joi.object().keys({
  title: Joi.string(),
  type: Joi.string().required(),
  launchCode: Joi.number()
});

/**
 * Action
 *
 * @constructor
 * @param {Object} [opts]
 */
module.exports = function (opts) {

  var validated = Joi.validate(opts, schema);

  if (validated.error) {
    throw validated.error;
  }

  this.opts = validated.value;
};
