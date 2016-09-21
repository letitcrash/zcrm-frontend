
'use strict';

angular
.module('inspinia')
.controller('NewsCreateController', function($scope, $rootScope, $state, $log, dataService, generalUtils, cmsService) {

  $scope.user = dataService.getUser();

  $scope.convertToDate = function(ts) {
    return generalUtils.formatTimestampToDate(ts);
  }

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
    
    $scope.currentCompanyId = dataService.getCurrentCompanyId();
  };
  $scope.init();
  
});

//# sourceMappingURL=loginController.js.map
