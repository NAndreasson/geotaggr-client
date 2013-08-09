/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var AppView = Backbone.View.extend({
        template: JST['app/scripts/templates/application.ejs'],

        _initMap: function() {
          var mapOptions = {
            center: new google.maps.LatLng(62, 15),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        },

        initialize: function() {
          google.maps.event.addDomListener(window, 'load', this._initMap);
        }
    });

    return AppView;
});