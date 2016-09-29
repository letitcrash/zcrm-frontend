'use strict';

angular
  .module('inspinia')
  .directive('crmDelete', function () {
    return {
      templateUrl: 'app/cms/directives/delete.html'
    };
  });
