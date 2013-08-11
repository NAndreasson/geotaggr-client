/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var ControllerView = Backbone.View.extend({
    el: '#map-controls',

    events: {
      'click a': 'changeTab'
    },

    initialize: function() {
      // set up tabs??
      console.log('Initializing controller view');
    },

    changeTab: function(e) {
      // var $a = $(e.target);
      // $a.tab('show');
      // console.log('Arguments', arguments);
    }
  });

  return ControllerView;
});