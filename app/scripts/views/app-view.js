/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'templates',
  'collections/geotags',
  'views/new-tag-view',
  'views/geotag-list-view'
], function ($, _, Backbone, Bootstrap, JST, GeoTags, NewTagView, GeoTagListView) {
    'use strict';

    var AppView = Backbone.View.extend({

      template: JST['app/scripts/templates/application.ejs'],

      events: {
      },

      _initMap: function() {
        var self = this,
          mapOptions = {
            center: new google.maps.LatLng(62, 15),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

        this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      },

      initialize: function() {
        this.geoTags = new GeoTags();

        this._initMap();

        this.newTagView = new NewTagView({ collection: this.geoTags, map: this.map });
        this.geoTagListView = new GeoTagListView({ collection: this.geoTags, map: this.map });

        this.geoTags.fetch();
      }

    });

    return AppView;
  });