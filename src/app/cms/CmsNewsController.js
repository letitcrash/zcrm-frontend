
'use strict';

angular
.module('inspinia')
.controller('CmsController', function($scope, $rootScope, $state, $log, dataService, generalUtils, cmsService) {
  
  
  $scope.user = dataService.getUser();
  console.log($scope.user.contactProfile.firstname);
  
  $scope.editArticle = function(article){

    //$state.transitionTo("index.addnews");
    console.log(article);
    $state.go('index.editnews', {articleId:article.id});

    //$scope.addNews = article;

  };

  $scope.setTab = function(newTab){
    $scope.tab = newTab;
  };
  
  $scope.isSet = function(tabNum){
    return $scope.tab === tabNum;
  };

  $scope.convertToDate = function(ts) {
    return generalUtils.formatTimestampToDate(ts);
  }
  
  console.log("news");
  
  $scope.getNewsList = function(force, pageSize, pageNr, searchTerm) {
    cmsService.getList(force, pageSize, pageNr, searchTerm).then(function(response) {
      console.log(response);
      $scope.news = response.data;
      $scope.totalItems = response.totalSize;
    }, function(response) {
      console.log("Failed to get news");
    });
  };
  
  
  var ThisDate = new Date().getTime();
  
  $scope.create = function(addNews) {
    
    
    $scope.addNews.date = ThisDate;
    $scope.addNews.author = $scope.user.contactProfile.id;
    $scope.addNews.permission = 99;
    $scope.addNews.description = $scope.addNews.text.split("<hr>")[0];
    cmsService.post(addNews).then(function(response) {
      
      
      
      console.log("News posted");
      console.log(response);
      $scope.news.push(response);
      $scope.userFormStep = undefined;
    }, function(response) {
      console.log("News could not be created");
      $scope.useralert = "News could not be created";
    });
  };
  
  $scope.summernote = {
    height: 300,
    focus: true,
    toolbar: [
    ['edit',['undo','redo']],
    ['headline', ['style']],
    ['style', ['bold', 'italic', 'underline']],
    ['fontclr', ['color']],
    ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
    ['height', ['height']],
    ['table', ['table']],
    ['insert', ['picture','hr']]
    ]
  };
  
  console.log($scope.news);
  
  $scope.init = function() {
    $scope.addNews = {};
    $scope.tab = 1;
    $scope.pageSize = 10;
    $scope.pageNr = 1;
    $scope.searchTerm = "";
    $scope.getNewsList(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
    
    $scope.currentCompanyId = dataService.getCurrentCompanyId();
  };
  $scope.init();
  
});

//# sourceMappingURL=loginController.js.map
