/* global define */

define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
    'use strict';

    var GeoTagMarkerView = Backbone.View.extend({

      initialize: function(options) {
        this.map = options.map;

        // add a listener, which removes the marker
        this.listenTo( this.model, 'remove', this._removeMarker );

        this._initMarker();
      },

      _initMarker: function() {
        var self = this,
          latLng = new google.maps.LatLng(
            this.model.get('lat'),
            this.model.get('lng')
          );

        this.marker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          title: 'Hello World!'
        });

        this.infowindow = new google.maps.InfoWindow({
          content: this.model.get('desc')
        });

        google.maps.event.addListener(this.marker, 'mouseover', function() {
          self.showInfoWindow();
        });
      },

      _removeMarker: function() {
        this.hideInfoWindow();
        this.marker.setMap( null );
        this.remove();
      },

      panTo: function() {
        this.map.panTo( this.marker.getPosition() );
      },

      showInfoWindow: function() {
        this.infowindow.open(this.map, this.marker);
      },

      hideInfoWindow: function() {
        this.infowindow.close();
      },


      render: function() { }
    });

    return GeoTagMarkerView;
  });