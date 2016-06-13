'use strict';

angular.module('inspinia')
.controller('DocsController', function ($http, $scope, Upload, $timeout, dataService, docsService) {
  
  var getFiles;
  
  getFiles = function(force, pageSize, pageNr, searchTerm) {
    docsService.getList(force, pageSize, pageNr, searchTerm).then(function(response) {
      console.log("got files");
      console.log(response);
      $scope.showLoadingMessage = false;
      $scope.uploadedFiles = response.data;
      $scope.totalItems = response.totalCount;
    }, function(response) {
      console.log("Could not get files");
      return console.log(response);
    });
  };
  
  // File lists
  
  $scope.uploadFiles = function(files, errFiles) {

    var token = dataService.getSessionToken();
    var userId = dataService.getUserId();
    var upUrl = dataService.getBaseServiceURL() + "users/" + userId + "/files";
    $scope.files = files;
    $scope.errFiles = errFiles;
    angular.forEach(files, function(file) {
      file.upload = Upload.upload({
        url: upUrl,
        data: {fileUpload: file},
        headers: {
          "Content-Type": "multipart/mixed",
          "X-Access-Token": token,
          "X-User-Id": userId
        }
      });
      
      file.upload.then(function (response) {
        $timeout(function () {
          console.log(response)
          file.result = response.data;
        });
      }, function (response) {
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
        //console.log(evt);
        file.progress = Math.min(100, parseInt(100.0 * 
        evt.loaded / evt.total));
        console.log(file.progress);
      });
    });
  }
  $scope.deleteFiles = function(){
    angular.forEach($scope.uploadedFiles, function(file){
      if(file.selected){
        var index = $scope.uploadedFiles.indexOf(file);
        if (index >= 0) {
          docsService.deleteFile(file.id).then(function(response) {
            console.log("UPF "+file.fileName+" deleted "+file.id);
              console.log(index);
              $scope.uploadedFiles.splice(index, 1);
          });
        }
      }
    });
    angular.forEach($scope.files, function(file){
      if(file.selected){
        var index = $scope.files.indexOf(file);
        if (index >= 0) {
          docsService.deleteFile(file.result.body.id).then(function(response) {
            console.log("UPF "+file.result.body.fileName+" deleted "+file.result.body.id);
              console.log(index);
              $scope.files.splice(index, 1);
          });
        }
      }
    });
  }

  
  
  $scope.init = function() {
    $scope.isCollapsed = false;
    $scope.showLoadingMessage = true;
    $scope.pageSize = 20;
    $scope.pageNr = 1;
    $scope.searchTerm = "";
    getFiles(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
  };
  return $scope.init();

});

angular.module('ui.bootstrap').controller('Collapse', function ($scope) {
  $scope.isCollapsed = false;
});
