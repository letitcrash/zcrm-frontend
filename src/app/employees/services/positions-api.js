'use strict';

angular
  .module('inspinia')
  // Services for working with Position API
  .factory('positionsAPI', function(requestService) {
    var apiURL = 'companies/:companyId/positions';

    return {
      all: function(params) {
        return requestService.ttGet(apiURL, params);
      }
    };
  });
