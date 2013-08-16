/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
    'use strict';

    var GeoTag = Backbone.Model.extend({
      defaults: {
        name: '',
        desc: '',
        country: '',
        lat: 0,
        lng: 0
      },

      validation: {
        name: [{
          required: true,
          msg: 'Please enter a name'
        }, {
          minLength: 3,
          maxLength: 30,
          msg: 'Name length min 3 characters, max 30'
        }]
      }

    });

    return GeoTag;
  });