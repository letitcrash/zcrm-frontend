'use strict';

angular
  .module('inspinia')
  .factory('imagesApi', function (requestService) {
    return {
      upload: function (file) {
        var url = "images/upload";
        return requestService.uploadFileRequest(url, 'POST', file);
      }
    };
  });
