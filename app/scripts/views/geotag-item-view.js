/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

  var GeoTagItemView = Backbone.View.extend({
    tagName: 'li',
    template: JST['app/scripts/templates/geotag-item.ejs'],

    events: {
      'click': 'selectItem'
    },

    initialize: function( options ) {
      this.map = options.map;

      this.listenTo( this.model, 'change', this.render );
    },

    render: function() {
      this.$el.html( this.template( this.model.toJSON() ) );
      return this;
    },

    selectItem: function() {
      console.log('Select item', this.map);
      console.log('Select', this);
      var latLong = new google.maps.LatLng( this.model.get('lat'), this.model.get('long') );

      this.map.setOptions({ center: latLong });
      console.log('Select??');
    }
  });

  return GeoTagItemView;
});