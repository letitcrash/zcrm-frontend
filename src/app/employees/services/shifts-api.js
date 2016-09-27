'use strict';

angular
  .module('inspinia')
  // Services for working with shifts API
  .factory('shiftsAPI', function(requestService) {
    var apiURL = 'companies/:companyId/shifts';

    return {
      all: function(params) {
        return requestService.ttGet(apiURL, params);
      }
    };
  });
