'use strict';

angular
  .module('inspinia')
  .directive('crmNewsList', function ($log, newsApi, newsListConf) {
    return {
      restrict: 'A',
      scope: {news: '=?crmNewsList', dspFields: '@?fields'},
      templateUrl: 'app/cms/directives/news-list.html',
      link: function(scope) {
        // Loading statuses
        // 0 - error, 1 - success, 2 - loading
        scope.loadStats = {list: 1};

        // News fields(News list columns)
        scope.fields = {
          title: {title: 'Title', active: true},
          author: {title: 'Author', active: true},
          tags: {title: 'Tags', active: true},
          date: {title: 'Date', active: true}
        };

        if (angular.isString(scope.dspFields)) {
          scope.dspFields = scope.dspFields.split(',');

          for (var f in scope.fields) {
            if (hasOwnProperty.call(scope.fields, f)) {
              if (scope.dspFields.indexOf(f) === -1)
                scope.fields[f].active = false;
            }
          }
        }

        scope.today = new Date();

        if (!angular.isArray(scope.news))
          scope.news = [];

        // GET params for news list
        scope.params = newsListConf.params;

        scope.getNews = function getNews() {
          scope.loadStats.list = 2;

          newsApi.getList(scope.params).then(function(res) {
            $log.log(res);
            if (res.hasOwnProperty('data')) {
              scope.news = res.data;
              scope.loadStats.list = 1;
            } else {
              scope.loadStats.list = 0;
              $log.log(res);
            }
          }, function(res) {
            scope.loadStats.list = 0;
            $log.log(res);
          });
        };

        // Get news on sorting
        scope.$watchGroup(['params.order', 'params.sort'], scope.getNews);
      }
     };
  });
