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

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
      this.$el.html( this.template( this.model.toJSON() ) );
      return this;
    }
  });

  return GeoTagItemView;
});