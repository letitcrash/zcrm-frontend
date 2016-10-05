'use strict';

angular
  .module('inspinia')
  // Directive for filtering in tickets list
  .directive('crmTicketsListFilter', function(ticketsListConf, ticketPriorityConf) {
    return {
      restrict: 'A',
      scope: {},
      template: '<div class="btn-group">' +
        '<button class="btn" ng-class="btnClass(id)" ng-repeat="(id, label) in ::priority"' +
        'ng-click="params.priority = params.priority === id ? null : id">{{ ::label | translate }}</button></div>',
      link: function(scope) {
        // GET params for ticket list
        scope.params = ticketsListConf.params;

        // Ticket priority labels
        scope.priority = ticketPriorityConf.labels;

        // Switch button classes
        scope.btnClass = function btnClass(id) { return id === scope.params.priority ? 'btn-primary' : 'btn-default'; };
      }
    };
  })
