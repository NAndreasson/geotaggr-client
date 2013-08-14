/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'helpers/geo'
], function ($, _, Backbone, GeoUtil) {
    'use strict';

    var NewTagView = Backbone.View.extend({
      el: '#new-tag',

      events: {
        'click #new-tag-button': 'createNewTag',
      },

      initialize: function( options ) {
        this.map = options.map;

        this._initNewMarkerListener();

        this.$nameInput = this.$('#name');
        this.$latInput  = this.$('#lat');
        this.$lngInput = this.$('#lng');
        this.$descInput = this.$('#desc');
      },

      _initNewMarkerListener: function() {
        var self = this;

        google.maps.event.addListener(this.map, 'rightclick', function( ev ) {
          var latLng = ev.latLng;
          self.dropNewMarker( latLng );
        });

      },

      dropNewMarker: function( latLng ) {
        new google.maps.Marker({
          position: latLng,
          map: this.map,
          animation: google.maps.Animation.DROP,
          title: 'Hello World!'
        });
      },

      createNewTag: function( e ) {
        e.preventDefault();

        var self = this,
          newAttributes = this.newAttributes(),
          latLng = new google.maps.LatLng(newAttributes.lat, newAttributes.lng);

        GeoUtil.getCountry(latLng, function(err, country) {
          console.log('Country', country);
          newAttributes.country = country || '';

          self.collection.create( newAttributes );
          self.clearAttributes();
        });
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

      render: function() { }
    });

    return NewTagView;
  });