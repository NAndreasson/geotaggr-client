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

        this._initMarker();
      },

      _initMarker: function() {
        var latLng = new google.maps.LatLng(
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

        google.maps.event.addListener(this.marker, 'mouseover', this.showInfoWindow);
      },

      showInfoWindow: function() {
        this.infowindow.open(this.map, this.marker);
      },

      hideInfoWindow: function() {
        this.infowindow.close(this.map, this.marker);
      },

      render: function() { }
    });

    return GeoTagMarkerView;
  });