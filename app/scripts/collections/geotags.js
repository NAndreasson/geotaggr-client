/*global define*/

define([
    'underscore',
    'backbone',
    'models/geotag'
], function (_, Backbone, GeoTag) {
    'use strict';

    var GeoTags = Backbone.Collection.extend({
      model: GeoTag
    });

    return GeoTags;
});