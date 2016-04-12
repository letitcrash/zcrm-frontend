'use strict';
angular.module('inspinia').factory('ticketsService', function(requestService, dataService) {
  return {
    getList: function(force, pageSize, pageNr, searchTerm) {
      var url;
        url = "companies/" + dataService.getCurrentCompanyId() + "/employees/" + dataService.getEmployments().id + "/tickets";
      if (pageSize && pageNr) {
        if (searchTerm) {
          url = url + "?pageSize=" + pageSize + "&pageNr=" + pageNr + "&searchTerm=" + searchTerm;
        } else {
          url = url + "?pageSize=" + pageSize + "&pageNr=" + pageNr;
        }
      }
      return requestService.ttGet(url);
    }
  };
});