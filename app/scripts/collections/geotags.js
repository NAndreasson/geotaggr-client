/*global define*/

define([
    'underscore',
    'backbone',
    'models/geotag',
    'lsBackbone'

], function (_, Backbone, GeoTag, LocalStorageBackbone) {
    'use strict';

    var GeoTags = Backbone.Collection.extend({
      model: GeoTag,

      localStorage: new LocalStorageBackbone('geotags')
    });

    return GeoTags;
});