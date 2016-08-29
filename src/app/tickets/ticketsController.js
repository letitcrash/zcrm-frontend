'use strict';

angular
  .module('inspinia')
  // TODO: Move directives to separate directory under tickets
  // Directive for visual formating ticket status
  .directive('ticketStatus', function() {
    return {
      restrict: 'A',
      scope: {stat: '=ticketStatus'},
      template: '<span class="label" ng-class="labelClass">{{ labelTitle | translate }}</span>',
      link: function(scope) {
        switch (scope.stat) {
          case 1:
            scope.labelTitle = 'New';
            scope.labelClass = 'label-danger';
            break;
          case 2:
            scope.labelTitle = 'In progress';
            scope.labelClass = 'label-success';
            break;
          case 3:
            scope.labelTitle = 'Postponed';
            scope.labelClass = 'label-info';
            break;
          case 4:
            scope.labelTitle = 'Complete';
            scope.labelClass = 'label-primary';
            break;
          default:
            break;
        }
      }
    };
  })
  // Directive for visual formating ticket priority
  .directive('ticketPriority', function() {
    return {
      restrict: 'A',
      scope: {prior: '=ticketPriority'},
      template: '<span class="label" ng-class="labelClass">{{ labelTitle | translate }}</span>',
      link: function(scope) {
        switch (scope.prior) {
          case 0:
            scope.labelTitle = 'Low';
            break;
          case 1:
            scope.labelTitle = 'Middle';
            scope.labelClass = 'label-info';
            break;
          case 2:
            scope.labelTitle = 'High';
            scope.labelClass = 'label-warning';
            break;
          case 3:
            scope.labelTitle = 'ASAP';
            scope.labelClass = 'label-danger';
            break;
          default:
            break;
        }
      }
    };
  })
  .controller('TicketsController', function() {
    // View
    var vm = this;

    // Current date
    vm.today = new Date();
  });
