/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

  var NewTagView = Backbone.View.extend({
    el: '#new-tag',

    events: {
      'click #new-tag-button': 'createNewTag'
    },

    initialize: function() {
    },

    createNewTag: function(e) {
      e.preventDefault();

      // get name, lat, long and desc and create a new GeoTag

      // reset the input fields

    },

    render: function() {

    }
  });

  return NewTagView;
});