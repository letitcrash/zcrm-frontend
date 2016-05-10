'use strict';
angular.module('inspinia').factory('usersService', function(requestService) {
  console.log("usersService initializing");
  return {
    getList: function(force, pageSize, pageNr, searchTerm) {
      var url;
      url = "users";
      if (pageSize && pageNr) {
        if (searchTerm) {
          url = url + "?pageSize=" + pageSize + "&pageNr=" + pageNr + "&searchTerm=" + searchTerm;
        } else {
          url = url + "?pageSize=" + pageSize + "&pageNr=" + pageNr;
        }
      }
      return requestService.ttGet(url);
    },
    update: function(user) {
      var url;
      url = "users/" + user.id;
      return requestService.ttPut(url, user);
    },
    get: function(id) {
      var url;
      url = "users/" + id;
      return requestService.ttGet(url);
    },
    post: function(user) {
      var url;
      url = "users";
      return requestService.ttPost(url, user);
    }
  };
});

//# sourceMappingURL=usersService.js.map
