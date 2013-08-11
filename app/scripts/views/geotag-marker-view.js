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
          title:"Hello World!"
        });

      marker.setMap(map);
    },

    render: function() { }
  });

  return GeoTagMarkerView;
});