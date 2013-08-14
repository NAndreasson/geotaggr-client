/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/geotag-item-view',
  'views/geotag-marker-view'
], function ($, _, Backbone, JST, GeoTagItemView, GeoTagMarkerView) {
  'use strict';

  var GeoTagListView = Backbone.View.extend({
    el: '#tags',

    events: {
    },

    initialize: function( options ) {
      this.map = options.map;

      this.listenTo( this.collection, 'add', this.addOne );
      this.listenTo( this.collection, 'reset', this.addAll );
    },

    addOne: function( geoTag ) {
      this.$('.empty').remove();

      var markerView = new GeoTagMarkerView({ model: geoTag, map: this.map }),
        view = new GeoTagItemView({ model: geoTag, markerView: markerView });

      $('#tag-list').append( view.render().el );
    },

    addAll: function() {
      $('#tag-list').html('');
      this.collection.each(this.addOne, this);
    },

    selectTag: function() {
    }
  });

  return GeoTagListView;
});