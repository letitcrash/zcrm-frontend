'use strict';

angular
  .module('inspinia')
  // Dropdown directive for selecting ticket priority
  .directive('crmTicketPriorityDropdown', function(ticketPriorityConf) {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {cssClass: '@dropdownClass'},
      templateUrl: 'app/tickets/directives/priority-status-dropdown.html',
      link: function(scope, elem, atts, ngModel) {
        scope.labels = ticketPriorityConf.labels;
        scope.colors = ticketPriorityConf.colors;
        scope.selectedId = 1;

        scope.changeSelected = function changeSelected(id) {
          scope.selectedId = id
          ngModel.$setViewValue(parseInt(id));
        };

        ngModel.$render = function() {
          if (angular.isNumber(ngModel.$modelValue))
            scope.selectedId = ngModel.$modelValue;
        };
      }
    };
  })
