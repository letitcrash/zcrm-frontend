'use strict';

angular
  .module('inspinia')
  // Directive for select Union based on ui-select
  .directive('crmUnionSelect', function(unionsAPI) {
    return {
      restrict: 'A',
      scope: {selected: '=crmUnionSelect',  placeholder: '@'},
      templateUrl: 'app/employees/directives/id-name-select.html',
      link: function(scope) {
        // Unions
        scope.items = [];

        // Get unions
        unionsAPI.all().then(function(res) { scope.items = res; });
      }
    };
  });
