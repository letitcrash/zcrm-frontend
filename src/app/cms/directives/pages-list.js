'use strict';

angular
  .module('inspinia')
  .directive('crmPagesList', function ($log, pagesApi, pagesListConf) {
    return {
      restrict: 'A',
      scope: {news: '=?crmPagesList', dspFields: '@?fields'},
      templateUrl: 'app/cms/directives/pages-list.html',
      link: function(scope) {
        // Loading statuses
        // 0 - error, 1 - success, 2 - loading
        scope.loadStats = {list: 1};

        // Pages fields(Pages list columns)
        scope.fields = {
          title: {title: 'Title', active: true},
          author: {title: 'Author', active: true},
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

        if (!angular.isArray(scope.pages))
          scope.pages = [];

        // GET params for pages list
        scope.params = pagesListConf.params;

        scope.getPages = function getPages() {
          scope.loadStats.list = 2;

          pagesApi.getList(scope.params).then(function(res) {
            $log.log(res);
            if (res.hasOwnProperty('data')) {
              scope.pages = res.data;
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

        // Get pages on sorting
        scope.$watchGroup(['params.order', 'params.sort'], scope.getPages);
      }
    };
  });
