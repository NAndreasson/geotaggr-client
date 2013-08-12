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
      this.$nameInput = this.$('#name');
      this.$latInput  = this.$('#lat');
      this.$longInput = this.$('#long');
      this.$descInput = this.$('#desc');
    },

    createNewTag: function(e) {
      e.preventDefault();

      var newAttributes = {
        name: this.$nameInput.val(),
        lat: +this.$latInput.val(),
        lng: +this.$longInput.val(),
        desc: this.$descInput.val()
      };

      this.collection.create( newAttributes );
    },

    render: function() {

    }
  });

  return NewTagView;
});