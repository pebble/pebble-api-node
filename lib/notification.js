'use strict';

var Layout = require('./layout');
var Joi = require('joi');

var schema = Joi.object({
  time: Joi.date().iso(),
  layout: Joi.object().required()
});

/**
 * Notification
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

  var layout = this.opts.layout;

  if (!(layout instanceof Layout)) {
    this.opts.layout = new Layout(layout);
  }
};
