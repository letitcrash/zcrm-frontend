'use strict';

angular.module('inspinia')
  .controller('DocsController', function ($http, $scope, Upload, dataService) {

    var upUrl = "http://desk-it.com:9000/users/" + dataService.getEmployments().id + "/files";

    $scope.uploadFiles = function(files, errFiles) {
        $scope.files = files;
        $scope.errFiles = errFiles;
        angular.forEach(files, function(file) {
            file.upload = Upload.upload({
                url: upUrl,
                data: {file: file}
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
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });
        });
    }


  });
