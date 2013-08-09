/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var GeoTag = Backbone.Model.extend({
      defaults: {
        lat: 0,
        long: 0,
        desc: ''
      }
    });

    return GeoTag;
});