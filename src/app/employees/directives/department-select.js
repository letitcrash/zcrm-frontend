'use strict';

angular
  .module('inspinia')
  // Directive for select Department based on ui-select
  .directive('crmDepSelect', function(departmentsAPI) {
    return {
      restrict: 'A',
      scope: {selected: '=crmDepSelect',  placeholder: '@'},
      templateUrl: 'app/employees/directives/id-name-select.html',
      link: function(scope) {
        // Shifts
        scope.items = [];

        // Get shifts
        departmentsAPI.all().then(function(res) { scope.items = res; });
      }
    };
  });
