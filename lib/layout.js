'use strict';

var Joi = require('joi');

var schema = Joi.object().keys({
  type: Joi.string().required().valid([
    'genericPin',
    'calendarPin',
    'genericReminder',
    'genericNotification',
    'commNotification',
    'weatherPin',
    'sportsPin'
  ]),
  title: Joi.string()
    .when('type', {
      is: Joi.string().valid([
        'genericPin',
        'calendarPin',
        'sportsPin',
        'weatherPin',
        'genericReminder',
        'genericNotification',
        'commNotification'
      ]),
      then: Joi.required()
    }),
  shortTitle: Joi.string(),
  subtitle: Joi.string(),
  body: Joi.string(),
  tinyIcon: Joi.string()
    .when('type', {
      is: Joi.string().valid([
        'genericPin',
        'sportsPin',
        'weatherPin',
        'genericReminder',
        'genericNotification',
        'commNotification'
      ]),
      then: Joi.required()
    }),
  smallIcon: Joi.string(),
  largeIcon: Joi.string()
    .when('type', {
      is: Joi.string().valid(['weatherPin', 'sportsPin']),
      then: Joi.required()
    }),
  lastUpdated: Joi.date().iso(),
  // weatherPin specific
  locationName: Joi.string()
    .when('type', { is: 'weatherPin', then: Joi.required() }),
  // sportsPin specific
  broadcaster: Joi.string()
    .when('type', { is: 'sportsPin', then: Joi.required() }),
  rankAway: Joi.string()
    .when('type', { is: 'sportsPin', then: Joi.required() }),
  rankHome: Joi.string()
    .when('type', { is: 'sportsPin', then: Joi.required() }),
  nameAway: Joi.string().max(4)
    .when('type', { is: 'sportsPin', then: Joi.required() }),
  nameHome: Joi.string().max(4)
    .when('type', { is: 'sportsPin', then: Joi.required() }),
  recordAway: Joi.string()
    .when('type', { is: 'sportsPin', then: Joi.required() }),
  recordHome: Joi.string()
    .when('type', { is: 'sportsPin', then: Joi.required() }),
  scoreAway: Joi.string()
    .when('type', { is: 'sportsPin', then: Joi.required() }),
  scoreHome: Joi.string()
    .when('type', { is: 'sportsPin', then: Joi.required() }),
  sportsGameState: Joi.string()
    .when('type', { is: 'sportsPin', then: Joi.required() }),
  // commNotification specific
  sender: Joi.string()
    .when('type', { is: 'commNotification', then: Joi.required() }),
});

/**
 * Layout
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
