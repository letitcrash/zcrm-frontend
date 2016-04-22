'use strict';

angular.module('inspinia')
  .controller('DocsController', function ($http, $scope, Upload,$timeout, dataService, docsService) {

    var upUrl = "http://desk-it.com:9000/users/" + dataService.getEmployments().id + "/files";

    $scope.uploadFiles = function(files, errFiles) {
        $scope.files = files;
        $scope.errFiles = errFiles;
        angular.forEach(files, function(file) {
            file.upload = Upload.upload({
                url: upUrl,
                data: {fileUpload: file}
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
                console.log(evt);
                file.progress = Math.min(100, parseInt(100.0 * 
                                       evt.loaded / evt.total));
                console.log(file.progress);
            });
        });
    }

    $scope.getUserFiles = function() {
    //docsService.get(dataService.getEmployments().id).then(function(response) {
        $http.get(upUrl).then(function(response) {
          console.log("got files list");
          console.log(response);
          $scope.allfiels = response.data;
          $scope.showLoadingMessage = false;
      }, function(response) {
          console.log("Could not get files");
          console.log(response);
      });
    };
    $scope.getUserFiles();
});
