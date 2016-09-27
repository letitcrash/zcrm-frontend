'use strict';

angular
  .module('inspinia')
  // Directive for select Shift based on ui-select
  .directive('crmShiftSelect', function(shiftsAPI) {
    return {
      restrict: 'A',
      scope: {selected: '=crmShiftSelect',  placeholder: '@'},
      templateUrl: 'app/employees/directives/id-name-select.html',
      link: function(scope) {
        // Shifts
        scope.items = [];

        // Get shifts
        shiftsAPI.all().then(function(res) { scope.items = res; });
      }
    };
  });
