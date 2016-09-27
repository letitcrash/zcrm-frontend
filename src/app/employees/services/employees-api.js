'use strict';

angular
  .module('inspinia')
  .factory('employeesAPI', function(requestService) {
    var apiURL = 'companies/:companyId/employees';

    return {
      getList: function(params) {
        return requestService.ttGet(apiURL, params);
      },
      create: function(emp) {
        return requestService.ttPost(apiURL, emp);
      }
    };
  });
