'use strict';

angular
  .module('inspinia')
  // Directive for multiple select Users with typeahead search functionality based on ui-select
  .directive('crmUserSelect', function() {
    return {
      restrict: 'A',
      scope: {selected: '=crmUserSelect',  placeholder: '@'},
      templateUrl: 'app/users/directives/user-select.html',
      controller: function() {
        var ctrl = this;

        // Placeholder function need to be overrided in child directives
        ctrl.getUsers = function getUsers() { return []; };
      },
      controllerAs: 'usrSelect'
    };
  });
