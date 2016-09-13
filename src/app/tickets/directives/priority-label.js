'use strict';

angular
  .module('inspinia')
  // Directive for displaying ticket priority in label
  .directive('crmTicketPriorityLabel', function(ticketPriorityConf) {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {},
      template: '<span class="label" data-ng-class="labelClass" ng-bind="::labelTitle | translate"></span>',
      link: function(scope, elem, atts, ngModel) {
        ngModel.$render = function() {
          if (angular.isNumber(ngModel.$modelValue)) {
            scope.labelTitle = ticketPriorityConf.labels[ngModel.$modelValue];
            scope.labelClass = 'label-' + ticketPriorityConf.colors[ngModel.$modelValue];
          }
        };
      }
    };
  })
