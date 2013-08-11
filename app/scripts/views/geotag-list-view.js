/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'views/geotag-item-view'
], function ($, _, Backbone, JST, GeoTagItemView) {
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
      console.log('Add one', this);
      var view = new GeoTagItemView({ model: geoTag, map: this.map });
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