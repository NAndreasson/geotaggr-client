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
        lat: 0,
        long: 0
      }
    });

    return GeoTag;
});