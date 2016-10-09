'use strict';

angular
  .module('inspinia')
  // Directive for Agents selecting base on ui-select and crm-employees-select
  .directive('crmAgentsSelect', function(dataService) {
    return {
      restrict: 'A',
      scope: {selected: '=crmAgentsSelect'},
      templateUrl: 'app/tickets/directives/agents-select.html',
      link: function(scope) {
        scope.alreadyAssigned = false;

        var user = dataService.getUser();
        var assignWatcher = scope.$watchCollection('selected', function(agents) {
          scope.alreadyAssigned = false;

          if (agents.length > 0) {
            for (var i = 0; i < agents.length; i++) {
              if (agents[i].id === user.id) {
                scope.alreadyAssigned = true;
                break;
              }
            }
          }
        });

        scope.$on('$destroy', function() { assignWatcher(); });

        var ngModel = angular.element('#agents').controller('ngModel');

        // Assign ticket to current user
        scope.assignToMe = function assignToMe() {
          if (!scope.alreadyAssigned) {
            scope.selected.push(user);
            ngModel.$setDirty();
          }
        }
      }
    };
  });
