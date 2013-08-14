/*global define*/

define([
  'underscore'
], function ( _ ) {
  'use strict';

  var geoUtils = {
    getCountry: function( latLng, cb ) {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'latLng': latLng}, handleResults);

      function handleResults( results, status ) {
        if (status == google.maps.GeocoderStatus.OK && results.length) {
          var country = extractCountry( results );
          cb(null, country);
        } else {
          cb('Country not found');
        }
      }
    } // end of getCountry
  };

  function extractCountry( results ) {
    var country = '';

    results.forEach(function( result ) {
      if ( result.types[0] === 'country' ) {
        country = result.formatted_address;
        return;
      }
    });

    return country;
  }

  return geoUtils;

});