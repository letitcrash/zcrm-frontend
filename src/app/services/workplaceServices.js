'use strict';
angular.module('inspinia').factory('workplaceService', function(requestService, dataService) {
  var getListRequest, getListRequestWithSubcontractor;
  getListRequest = function(pageSize, pageNr, searchTerm, cp) {
    var url;
    url = "companies/" + dataService.getCurrentCompanyId() + "/workplaces";
    if (pageNr && pageSize) {
      if (searchTerm) {
        if (cp) {
          url = url + "?pageNr=" + pageNr + "&pageSize=" + pageSize + "&searchTerm=" + searchTerm + "&searchParentId=" + cp.id;
        } else {
          url = url + "?pageNr=" + pageNr + "&pageSize=" + pageSize + "&searchTerm=" + searchTerm;
        }
      } else {
        if (cp) {
          url = url + "?pageNr=" + pageNr + "&pageSize=" + pageSize + "&searchParentId=" + cp.id;
        } else {
          url = url + "?pageNr=" + pageNr + "&pageSize=" + pageSize;
        }
      }
    }
    return requestService.ttGet(url);
  };
  getListRequestWithSubcontractor = function(cp) {
    var url;
    url = "companies/" + dataService.getCurrentCompanyId() + "/subcontractors/" + cp.id + "/workplaces";
    return requestService.ttGet(url);
  };
  return {

    /*
      Used to retrieve list of workplaces. The workplaces are stored in the service for reuse.
      In order to update the list of workplaces a page refresh is needed or calling this function with param force
     */
    getList: function(force, pageSize, pageNr, searchTerm, cp) {
      var data;
      data = dataService.getData();
      if (force || !data.data) {
        data.data = getListRequest(pageSize, pageNr, searchTerm, cp);
      }
      return data.data;
    },
    getListWithSubcontractorShared: function(force, cp) {
      var data;
      data = dataService.getData();
      if (force || !data.data) {
        data.data = getListRequestWithSubcontractor(cp);
      }
      return data.data;
    },
    getListWithParent: function(cp, force, pageSize, pageNr, searchTerm) {
      var data;
      data = dataService.getData();
      if (force || !data.data) {
        data.data = getListRequestWithParent(cp, pageSize, pageNr, searchTerm);
      }
      return data.data;
    },
    create: function(wp) {
      var url;
      url = "companies/" + dataService.getCurrentCompanyId() + "/workplaces";
      return requestService.ttPost(url, wp);
    },
    update: function(wp) {
      var url;
      url = "companies/" + dataService.getCurrentCompanyId() + "/workplaces/" + wp.id;
      return requestService.ttPut(url, wp);
    },
    "delete": function(id) {
      var url;
      url = "companies/" + dataService.getCurrentCompanyId() + "/workplaces/" + id;
      return requestService.ttDelete(url);
    }
  };
});

//# sourceMappingURL=workplaceServices.js.map
