'use strict';

angular
  .module('inspinia')
  .directive('cmsBackButton', function () {
    return {
      templateUrl: 'app/cms/directives/back-button.html'
    };
  });
