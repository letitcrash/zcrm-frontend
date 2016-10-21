'use strict';

angular
  .module('inspinia')
  // Directive for sorting in articles list
  .directive('crmArticlesListSort', function(articlesListConf) {
    return {
      restrict: 'A',
      scope: {},
      template: '<div class="input-group"><label class="input-group-addon label">{{ "Sort by" | translate }}:</label>' +
      '<ul ui-select ng-model="params.sort">' +
      '<li ui-select-match placeholder="Choose an option">{{ $select.selected.title }}</li>' +
      '<li ui-select-choices repeat="opt.param as opt in ::sortOpts">{{ ::opt.title }}</li></ul></div>',
      link: function(scope) {
        // GET params for articles list
        scope.params = articlesListConf.params;

        // Articles sorting options
        scope.sortOpts = [
          {param: 'title', title: 'Title'},
          {param: 'author', title: 'Author'},
          {param: 'tags', title: 'Tags'},
          {param: 'date', title: 'Date'}
        ];
      }
    };
  });