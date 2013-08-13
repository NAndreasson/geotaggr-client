/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone) {
    'use strict';

    var NewTagView = Backbone.View.extend({
      el: '#new-tag',

      events: {
        'click #new-tag-button': 'createNewTag'
      },

      initialize: function() {
        this.$nameInput = this.$('#name');
        this.$latInput  = this.$('#lat');
        this.$lngInput = this.$('#lng');
        this.$descInput = this.$('#desc');
      },

      newAttributes: function() {
        return {
          name: this.$nameInput.val(),
          lat: +this.$latInput.val(),
          lng: +this.$lngInput.val(),
          desc: this.$descInput.val()
        };
      },

      clearAttributes: function() {
        this.$nameInput.val('');
        this.$latInput.val('');
        this.$lngInput.val('');
        this.$descInput.val('');
      },

      createNewTag: function( e ) {
        e.preventDefault();

        this.collection.create( this.newAttributes() );
        this.clearAttributes();
      },

      render: function() { }
    });

    return NewTagView;
  });