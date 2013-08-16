/*global require*/
'use strict';

require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    }
  },
  paths: {
    jquery: '../bower_components/jquery/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    bootstrap: 'vendor/bootstrap',
    lsBackbone: 'vendor/backbone.localStorage-min',
    validation: 'vendor/backbone-validation-amd-min'
  }
});

require([
  'backbone', 'views/app-view'
], function (Backbone, AppView) {
  window.appView = new AppView();
  Backbone.history.start();
});
