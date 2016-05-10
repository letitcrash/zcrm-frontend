'use strict';
angular.module('inspinia').factory('parentCompanyService', function(dataService, requestService) {
  return {
    getList: function(force, pageSize, pageNr, searchTerm) {
      var url;
      url = "companies";
      if (pageSize && pageNr) {
        if (searchTerm) {
          url = "subcontractors/" + dataService.getCurrentCompanyId() + "/companies?pageSize=" + pageSize + "&pageNr=" + pageNr + "&searchTerm=" + searchTerm;
        } else {
          url = "subcontractors/" + dataService.getCurrentCompanyId() + "/companies?pageSize=" + pageSize + "&pageNr=" + pageNr;
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
    acceptStatus: function(cp) {
      var url;
      url = "subcontractors/" + dataService.getCurrentCompanyId() + "/companies/" + cp.id + "?status=2";
      return requestService.ttPut(url);
    },
    declineStatus: function(cp) {
      var url;
      url = "subcontractors/" + dataService.getCurrentCompanyId() + "/companies/" + cp.id + "?status=3";
      return requestService.ttPut(url);
    },
    cancelStatus: function(cp) {
      var url;
      url = "subcontractors/" + dataService.getCurrentCompanyId() + "/companies/" + cp.id + "?status=4";
      return requestService.ttPut(url);
    },
    "delete": function(id) {
      var url;
      url = "companies/" + id;
      return requestService.ttDelete(url);
    },
    post: function(email) {
      var url;
      url = "subcontractors/" + dataService.getCurrentCompanyId() + "/companies?email=" + email;
      return requestService.ttPost(url);
    }
  };
});

//# sourceMappingURL=parentCompanyService.js.map
