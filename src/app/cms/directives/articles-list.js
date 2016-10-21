'use strict';

angular
  .module('inspinia')
  .directive('cmsArticlesList', function ($log, articlesApi, articlesListConf) {
    return {
      restrict: 'A',
      controller: 'CmsCtrl',
      scope: {news: '=?crmArticlesList', dspFields: '@?fields'},
      templateUrl: 'app/cms/directives/articles-list.html',
      link: function(scope) {
        // Loading statuses
        // 0 - error, 1 - success, 2 - loading
        scope.loadStats = {list: 1};

        // Articles fields(Articles list columns)
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

        if (!angular.isArray(scope.articles))
          scope.articles = [];

        // GET params for pages list
        scope.params = articlesListConf.params;

        scope.getArticles = function getArticles() {
          scope.loadStats.list = 2;

          articlesApi.getList(scope.params).then(function(res) {
            $log.log(res);
            if (res.hasOwnProperty('data')) {
              scope.articles = res.data;
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

        // Get articles on sorting
        scope.$watchGroup(['params.order', 'params.sort'], scope.getArticles);
      }
    };
  });

