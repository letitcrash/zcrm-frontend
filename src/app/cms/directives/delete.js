'use strict';

angular
  .module('inspinia')
  .directive('cmsDelete', function () {
    return {
      templateUrl: 'app/cms/directives/delete.html'
    };
  });
