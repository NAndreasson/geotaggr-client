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
        'change #lat, #lng': 'latLngInputChanged'
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
          self.updateGhostMarker( latLng );
          self.updateLatLngInput( latLng );
        });

      },

      updateGhostMarker: function( latLng ) {
        this.removeGhostMarker();

        var newIcon = {
          path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          fillColor: 'blue',
          fillOpacity: 0.8,
          scale: 7,
          strokeWeight: 1
        };

        this.ghostMarker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          icon: newIcon,
          animation: google.maps.Animation.DROP
        });
      },

      removeGhostMarker: function() {
        if (this.ghostMarker) {
          this.ghostMarker.setMap( null );
          this.ghostMarker = null;
        }
      },

      updateLatLngInput: function( latLng ) {
        this.$latInput.val( latLng.lat() );
        this.$lngInput.val( latLng.lng() );
      },

      latLngInputChanged: function() {
        var lat = Number( this.$latInput.val() ),
          lng = Number ( this.$lngInput.val() ),
          latLng = new google.maps.LatLng(lat, lng);

        if (lat && lng) this.updateGhostMarker( latLng );
      },

      createNewTag: function( e ) {
        e.preventDefault();

        var self = this,
          newAttributes = this.newAttributes(),
          latLng = new google.maps.LatLng(newAttributes.lat, newAttributes.lng);

        GeoUtil.getCountry(latLng, function(err, country) {
          newAttributes.country = country || '';

          self.collection.create( newAttributes );
          self.clearAttributes();

          self.removeGhostMarker();
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