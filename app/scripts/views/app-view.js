/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'templates',
  'collections/geotags',
  'views/new-tag-view',
  'views/geotag-list-view',
  'views/geotag-marker-view'

], function ($, _, Backbone, Bootstrap, JST, GeoTags, NewTagView, GeoTagListView, GeoTagMarkerView) {
    'use strict';

    var AppView = Backbone.View.extend({

        template: JST['app/scripts/templates/application.ejs'],

        events: {
          'click #map-canvas': 'dropNewMarker'
        },

        _initMap: function() {
          var self = this,
            mapOptions = {
              center: new google.maps.LatLng(62, 15),
              zoom: 8,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };

          this.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

          google.maps.event.addListener(this.map, 'click', function( ev ) {
            var latLng = ev.latLng;
            self.dropNewMarker( latLng );
          });

        },

        initialize: function() {
          this.geoTags = new GeoTags();
          this.listenTo(this.geoTags, 'add', this.addMarker);
          this.listenTo(this.geoTags, 'reset', this.addMarkers);

          this._initMap();

          this.newTagView = new NewTagView({ collection: this.geoTags });
          this.geoTagListView = new GeoTagListView({ collection: this.geoTags, map: this.map });


          this.geoTags.fetch();

          // google.maps.event.addDomListener(window, 'load', this._initMap);

        },

        addMarker: function( geoTag ) {
          new GeoTagMarkerView({ model: geoTag, map: this.map });
        },

        addMarkers: function() {
          // go through the whole collection and call addMarker
        },

        dropNewMarker: function( latLng ) {
          new google.maps.Marker({
            position: latLng,
            map: this.map,
            animation: google.maps.Animation.DROP,
            title: 'Hello World!'
          });
        }

    });

    return AppView;
});