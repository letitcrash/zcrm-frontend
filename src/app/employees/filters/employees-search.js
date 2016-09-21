'use strict';

angular
  .module('inspinia')
  // Filter for searching employees by firstname, lastname and username
  .filter('crmEmployeesSearch', function() {
    return function(emps, search) {
      var res = [];

      if (angular.isArray(emps) && emps.length > 0) {
        res = emps.filter(function(emp) {
          var matched = false;
          var pfile = emp.user.contactProfile;

          if (pfile.hasOwnProperty('firstname') &&
              pfile.firstname.toLowerCase().indexOf(search) !== -1)
            matched = true;

          if (pfile.hasOwnProperty('lastname') &&
              pfile.lastname.toLowerCase().indexOf(search) !== -1)
            matched = true;

          if (emp.user.hasOwnProperty('username') &&
              emp.user.username.toLowerCase().indexOf(search) !== -1)
            matched = true;

          return matched
        });
      }

      return res;
    };
  });
