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
      'click li': 'selectTag'
    },

    initialize: function() {
      this.listenTo(this.collection, 'add', this.addOne);
      this.listenTo(this.collection, 'reset', this.addAll);

    },

    addOne: function(geoTag) {
      var view = new GeoTagItemView({ model: geoTag });
      $('#tag-list').append( view.render().el );
    },

    addAll: function() {
      $('#tag-list').html();
      this.collection.each(this.addOne, this);
    },

    selectTag: function() {
      console.log('Selecting tag!');
    }
  });

  return GeoTagListView;
});