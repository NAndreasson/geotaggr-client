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
      }
    });

    return GeoTag;
  });