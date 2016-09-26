'use strict';

angular
  .module('inspinia')
  .factory('imagesApi', function ($log, requestService) {
    $log.log("imagesApi initializing");

    function upload(file) {
      var url = "images/upload"
      return requestService.ttUploadFileRequest(url, 'POST', file);
    }

    return {
      upload: function (file) {
        $log.log("uploading ", file);
        return upload(file);
      }
    }
  });
