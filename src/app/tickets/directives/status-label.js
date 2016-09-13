'use strict';

angular
  .module('inspinia')
  // Directive for visual formating ticket status
  .directive('crmTicketStatusLabel', function(ticketStatusConf) {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {},
      template: '<span class="label" data-ng-class="labelClass" ng-bind="::labelTitle | translate"></span>',
      link: function(scope, elem, atts, ngModel) {
        ngModel.$render = function() {
          if (angular.isNumber(ngModel.$modelValue)) {
            scope.labelTitle = ticketStatusConf.labels[ngModel.$modelValue];
            scope.labelClass = 'label-' + ticketStatusConf.colors[ngModel.$modelValue];
          }
        };
      }
    };
  })
