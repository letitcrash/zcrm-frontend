'use strict';

angular
  .module('inspinia')
  .factory('employeesAPI', function(requestService) {
    var apiURL = 'companies/:companyId/employees';

    return {
      all: function(params) {
        return requestService.ttGet(apiURL, params);
      },
      get: function(empId) {
        return requestService.ttGet(apiURL + '/' + empId);
      },
      create: function(emp) {
        return requestService.ttPost(apiURL, emp);
      },
      update: function(emp) {
        return requestService.ttPut(apiURL + '/' + emp.id, emp);
      },
      delete: function(empId) {
        return requestService.ttDelete(apiURL + '/' + empId);
      }
    };
  });
