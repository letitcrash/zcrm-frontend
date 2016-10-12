'use strict';

angular
  .module('inspinia')
  // Directive for sorting in news list
  .directive('crmNewsListSort', function(newsListConf) {
    return {
      restrict: 'A',
      scope: {},
      template: '<div class="input-group"><label class="input-group-addon label">{{ "Sort by" | translate }}:</label>' +
      '<ul ui-select ng-model="params.sort">' +
      '<li ui-select-match placeholder="Choose an option">{{ $select.selected.title }}</li>' +
      '<li ui-select-choices repeat="opt.param as opt in ::sortOpts">{{ ::opt.title }}</li></ul></div>',
      link: function(scope) {
        // GET params for ticket list
        scope.params = newsListConf.params;

        // Tickets sorting options
        scope.sortOpts = [
          {param: 'title', title: 'Title'},
          {param: 'author', title: 'Author'},
          {param: 'tags', title: 'Tags'},
          {param: 'date', title: 'Date'}
        ];
      }
    };
  });