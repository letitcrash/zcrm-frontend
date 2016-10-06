'use strict';

angular
  .module('inspinia')
  .directive('cmsArticlesList', function () {
    return {
      templateUrl: 'app/cms/directives/articles-list.html'
    };
  });
