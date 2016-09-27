'use strict';

angular
  .module('inspinia')
  // Directive for select Position based on ui-select
  .directive('crmPosSelect', function(positionsAPI) {
    return {
      restrict: 'A',
      scope: {selected: '=crmPosSelect',  placeholder: '@'},
      templateUrl: 'app/employees/directives/id-name-select.html',
      link: function(scope) {
        // Positions
        scope.items = [];

        // Get shifts
        positionsAPI.all().then(function(res) { scope.items = res; });
      }
    };
  });
