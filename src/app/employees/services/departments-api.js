'use strict';

angular
  .module('inspinia')
  // Services for working with Department API
  .factory('departmentsAPI', function(requestService) {
    var apiURL = 'companies/:companyId/departments';

    return {
      all: function(params) {
        return requestService.ttGet(apiURL, params);
      }
    };
  });
