
'use strict';

angular
.module('inspinia')
.controller('CMSArticleEditController', function($scope, $rootScope, $state, $log, dataService, generalUtils, cmsService, imagesService, configurationService) {
  
  $scope.baseServiceUrl = configurationService.staticBaseUrl;

  $scope.getNewsArticle = function(id) {dataService
    cmsService.get(id).then(function(response) {
      console.log(response);
      $scope.article = response.data;
      $scope.totalItems = response.totalSize;
    }, function(response) {
      console.log("Failed to get news");
    });
  };
  
  
  $scope.update = function() {
    cmsService.put($scope.article).then(function(response) {
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
  
  $scope.uploadImage = function(attachedImage) {
    if(!attachedImage)
        return;

    $scope.attachedImage = attachedImage;
    imagesService.upload(attachedImage).then(function(response) {
        console.log(response);
        $scope.article.image = response.data;
    });
  };

  $scope.dropImageButtonClick = function() {
    $scope.attachedImage = undefined;
    $scope.article.image = undefined;
  };

  $scope.init();
  
})
.controller('CMSPageEditController', function($scope, $rootScope, $state, $log, dataService, generalUtils, cmsService) {
  
  $scope.getPage = function(id) {
    cmsService.getPage(id).then(function(response) {
      console.log(response);
      $scope.page = response.data;
      $scope.totalItems = response.totalSize;
    }, function(response) {
      console.log("Failed to get news");
    });
  };
  
  
  $scope.update = function(page) {
    cmsService.putPage(page).then(function(response) {
      console.log(response);
      $state.go('index.cms');
      
    }, function(response) {
      console.log("Failed to get news");
    });
  };
  
  $scope.init = function() {
    $scope.pageId = $state.params.pageId;
    console.log("Mod " + $scope.pageId);
    $scope.getPage($scope.pageId);

  };
  
  $scope.init();
  
});

//# sourceMappingURL=loginController.js.map
