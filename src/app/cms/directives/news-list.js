'use strict';

angular
  .module('inspinia')
  .directive('crmNewsList', function () {
    return {
      templateUrl: 'app/cms/directives/news-list.html'
    };
  });
