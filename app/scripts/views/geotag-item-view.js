/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var GeoTagItemView = Backbone.View.extend({
        tagName: 'li'

        initialize: function() {

        }
    });

    return GeoTagItemView;
});