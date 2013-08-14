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
        'click .name': 'selectItem',
        'click .close': 'deleteItem'
      },

      initialize: function( options ) {
        this.markerView = options.markerView;

        this.listenTo( this.model, 'change', this.render );
        this.listenTo( this.model, 'destroy', this.remove );
      },

      render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
      },

      selectItem: function() {
        this.markerView.panTo();
        this.markerView.showInfoWindow();
      },

      deleteItem: function() {
        this.model.destroy();
      }
    });

    return GeoTagItemView;
  });