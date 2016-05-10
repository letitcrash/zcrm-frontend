'use strict';
angular.module('inspinia').factory('subcontractorService', function(dataService, requestService) {
  return {
    getList: function(force, pageSize, pageNr, searchTerm) {
      var url;
      url = "companies";
      if (pageSize && pageNr) {
        if (searchTerm) {
          url = "companies/" + dataService.getCurrentCompanyId() + "/subcontractors?pageSize=" + pageSize + "&pageNr=" + pageNr + "&searchTerm=" + searchTerm;
        } else {
          url = "companies/" + dataService.getCurrentCompanyId() + "/subcontractors?pageSize=" + pageSize + "&pageNr=" + pageNr;
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
    post: function(email) {
      var url;
      url = "companies/" + dataService.getCurrentCompanyId() + "/subcontractors?email=" + email;
      return requestService.ttPost(url);
    },
    acceptStatus: function(cp) {
      var url;
      url = "companies/" + dataService.getCurrentCompanyId() + "/subcontractors/" + cp.id + "?status=2";
      return requestService.ttPut(url);
    },
    declineStatus: function(cp) {
      var url;
      url = "companies/" + dataService.getCurrentCompanyId() + "/subcontractors/" + cp.id + "?status=3";
      return requestService.ttPut(url);
    },
    cancelStatus: function(cp) {
      var url;
      url = "companies/" + dataService.getCurrentCompanyId() + "/subcontractors/" + cp.id + "?status=4";
      return requestService.ttPut(url);
    },
    sharedWorkplace: function(wp, cp) {
      var url;
      url = "companies/" + dataService.getCurrentCompanyId() + "/subcontractors/" + cp.id + "/workplaces/" + wp.id;
      return requestService.ttGet(url);
    },
    shareWorkplace: function(wp, cp) {
      var url;
      url = "companies/" + dataService.getCurrentCompanyId() + "/subcontractors/" + cp.id + "/workplaces/" + wp.id;
      return requestService.ttPost(url);
    },
    unshareWorkplace: function(wp, cp) {
      var url;
      url = "companies/" + dataService.getCurrentCompanyId() + "/subcontractors/" + cp.id + "/workplaces/" + wp.id;
      return requestService.ttDelete(url);
    }
  };
});

//# sourceMappingURL=subcontractorService.js.map
