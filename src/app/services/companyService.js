'use strict';
angular.module('inspinia').factory('companyService', function(requestService) {
  return {
    getList: function(force, pageSize, pageNr, searchTerm) {
      var url;
      url = "companies";
      if (pageSize && pageNr) {
        if (searchTerm) {
          url = url + "?pageSize=" + pageSize + "&pageNr=" + pageNr + "&searchTerm=" + searchTerm;
        } else {
          url = url + "?pageSize=" + pageSize + "&pageNr=" + pageNr;
        }
      }
      return requestService.ttGet(url);
    },
    get: function(id) {
      var url;
      url = "companies/" + id;
      return requestService.ttGet(url);
    },
    update: function(cp) {
      var url;
      url = "companies/" + cp.id;
      return requestService.ttPut(url, cp);
    },
    "delete": function(id) {
      var url;
      url = "companies/" + id;
      return requestService.ttDelete(url);
    },
    post: function(cp) {
      var url;
      url = "companies";
      return requestService.ttPost(url, cp);
    }
  };
});

//# sourceMappingURL=companyService.js.map
