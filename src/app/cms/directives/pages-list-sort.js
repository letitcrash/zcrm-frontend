'use strict';

angular
  .module('inspinia')
  // Directive for sorting in pages list
  .directive('crmPagesListSort', function(pagesListConf) {
    return {
      restrict: 'A',
      scope: {},
      template: '<div class="input-group"><label class="input-group-addon label">{{ "Sort by" | translate }}:</label>' +
      '<ul ui-select ng-model="params.sort">' +
      '<li ui-select-match placeholder="Choose an option">{{ $select.selected.title }}</li>' +
      '<li ui-select-choices repeat="opt.param as opt in ::sortOpts">{{ ::opt.title }}</li></ul></div>',
      link: function(scope) {
        // GET params for pages list
        scope.params = pagesListConf.params;

        // Pages sorting options
        scope.sortOpts = [
          {param: 'title', title: 'Title'},
          {param: 'author', title: 'Author'},
          {param: 'date', title: 'Date'}
        ];
      }
    };
  });