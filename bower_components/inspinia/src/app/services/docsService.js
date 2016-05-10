'use strict';
angular.module('inspinia').factory('docsService', function(requestService, dataService) {
  return {
    get: function(id) {
      var url;
      url = "users/" + id + "/files";
            console.log("ID:" +url)
      return requestService.ttGet(url);
    }
  };
});

