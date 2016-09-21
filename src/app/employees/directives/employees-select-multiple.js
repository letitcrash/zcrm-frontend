'use strict';

angular
  .module('inspinia')
  // Directive for multiple select Employees with typeahead search functionality based on ui-select
  .directive('crmSelectEmployees', function($parse, employeeService) {
    return {
      restrict: 'A',
      scope: {selected: '=crmSelectEmployees',  placeholder: '@'},
      templateUrl: 'app/employees/directives/employees-select-multiple.html',
      link: function(scope) {
        // Get employees
        scope.getEmployees = function getEmployees(search) {
          // TODO: Rewrite employeeService for pacing search term only
          employeeService.getList(null, 1000, 1, search).then(function(res) {
            scope.emps = res.data;
          });
        };
      }
    };
  });
