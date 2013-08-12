define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

  var GeoTagMarkerView = Backbone.View.extend({

    initialize: function(options) {
      var map = options.map,

        latLong = new google.maps.LatLng( this.model.get('lat'), this.model.get('long') ),
        marker = new google.maps.Marker({
          position: latLong,
          map: map,
          title: 'Hello World!'
        }),

        infowindow = new google.maps.InfoWindow({
          content: this.model.get('desc')
        });


      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
      });

    },

    render: function() { }
  });

  return GeoTagMarkerView;
});