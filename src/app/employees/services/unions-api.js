'use strict';

angular
  .module('inspinia')
  // Services for working with API
  .factory('unionsAPI', function(requestService) {
    var apiURL = 'companies/:companyId/unions';

    return {
      all: function(params) {
        return requestService.ttGet(apiURL, params);
      }
    };
  });
