'use strict';

angular
  .module('inspinia')
  // Directive for sorting in tickets list
  .directive('crmTicketsListSort', function(ticketsListConf) {
    return {
      restrict: 'A',
      scope: {},
      template: '<div class="input-group"><label class="input-group-addon label">{{ "Sort by" | translate }}:</label>' +
        '<ul ui-select ng-model="params.sort">' +
        '<li ui-select-match placeholder="Choose an option">{{ $select.selected.title }}</li>' +
        '<li ui-select-choices repeat="opt.param as opt in ::sortOpts">{{ ::opt.title }}</li></ul></div>',
      link: function(scope) {
        // GET params for ticket list
        scope.params = ticketsListConf.params;

        // Tickets sorting options
        scope.sortOpts = [
          {param: 'id', title: 'ID'},
          {param: 'subj', title: 'Title'},
          {param: 'priority', title: 'Priority'},
          {param: 'created', title: 'Creation date'},
          {param: 'deadline', title: 'Deadline'}
        ];
      }
    };
  })
