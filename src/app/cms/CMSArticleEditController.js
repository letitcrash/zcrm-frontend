
'use strict';

angular
.module('inspinia')
.controller('CMSArticleEditController', function($scope, $rootScope, $state, $log, dataService, generalUtils, cmsService) {
  
  $scope.getNewsArticle = function(id) {
    cmsService.get(id).then(function(response) {
      console.log(response);
      $scope.article = response.data;
      $scope.totalItems = response.totalSize;
    }, function(response) {
      console.log("Failed to get news");
    });
  };
  

  $scope.update = function(article) {
    cmsService.put(article).then(function(response) {
      console.log(response);
      $state.go('index.cms');

      //$scope.article = response.data;
      //$scope.totalItems = response.totalSize;
    }, function(response) {
      console.log("Failed to get news");
    });
  };

  $scope.init = function() {
    $scope.articleId = $state.params.articleId;
    console.log("Mod " + $scope.articleId);
    $scope.getNewsArticle($scope.articleId);


  };

  $scope.init();
  
});

//# sourceMappingURL=loginController.js.map