/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'validation',
  'helpers/geo',
  'models/geotag'
], function ($, _, Backbone, Validation, GeoUtil, GeoTag) {
    'use strict';

    var NewTagView = Backbone.View.extend({
      el: '#new-tag',

      events: {
        'click #new-tag-button': 'submitNewTag',
        'change #lat, #lng': 'latLngInputChanged'
      },

      initialize: function( options ) {
        this.map = options.map;

        this.model = new GeoTag();
        Validation.bind(this);

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

      submitNewTag: function( e ) {
        e.preventDefault();

        var self = this,
          newAttributes = this.newAttributes();

        this.model.set( newAttributes );

        if ( this.model.isValid( true ) ) {
          this.createNewTag();

          self.clearAttributes();
          self.hideAlert();
          self.removeGhostMarker();
          this.model = new GeoTag();

        } else {
          this.showAlert();
        }
      },

      createNewTag: function() {
        var self = this,
          model = this.model,
          latLng = new google.maps.LatLng( model.get('lat'), model.get('lng') );

        GeoUtil.getCountry(latLng, function(err, country) {
          var country = country || '';
          model.set('country', country);

          self.collection.add( model );
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

      showAlert: function() {
        var $alert = $('.alert');
        $alert.find('li').hide();

        $('.invalid').each(function() {
          var $el = $( this );
          $el.show().text( $el.data('error') );
        });

        $alert.show();
      },

      hideAlert: function() {
        $('.alert').hide();
      }

    });

    return NewTagView;
  });