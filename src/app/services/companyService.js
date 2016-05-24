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
      url = "companies/" + id + "/expand";
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

//# sourceMappingURL=companyService.js.map
