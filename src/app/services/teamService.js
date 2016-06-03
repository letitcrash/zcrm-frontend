'use strict';
angular.module('inspinia').factory('teamService', function(requestService, dataService, routeService) {
  return {
    getList: function(force, pageSize, pageNr, searchTerm) {
      var url;
	  url = "companies/" + dataService.getCurrentCompanyId() + "/teams";
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
      url = "companies/" + dataService.getCurrentCompanyId() + "/teams/" + id;
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
    post: function(team) {
      var url;
      url = "companies/" + dataService.getCurrentCompanyId() + "/teams";
      return requestService.ttPost(url, team);
    },
    addPosition: function(id, position) {
      var url;
      url = "companies/" + id + "/positions";
      return requestService.ttPost(url,position);
    },
    addUnion: function(id, union) {
      var url;
      url = "companies/" + id + "/unions";
      return requestService.ttPost(url, union);
    },
    modUnion: function(id, union) {
      var url;
      url = "companies/" + id + "/unions/" + union.id;
      return requestService.ttPut(url, union);
    },
    addDepartment: function(id, dept) {

      var url;
      url = "companies/" + id + "/departments";
      return requestService.ttPost(url, dept);
    },
    addShift: function(id, shift) {
      var url;
      url = "companies/" + id + "/shifts";
      return requestService.ttPost(url, shift);
    },
    addRole: function(id , role) {
      var url;
      url = "companies/" + id + "/delegates";
      return requestService.ttPost(url, role);
    }
  };
});

//# sourceMappingURL=teamService.js.map
