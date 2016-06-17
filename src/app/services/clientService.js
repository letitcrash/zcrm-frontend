'use strict';
angular.module('inspinia').factory('clientService', function(requestService, dataService,routeService) {
  return {
    getList: function(force, pageSize, pageNr, searchTerm) {
      var url;
        url = "companies/" + dataService.getCurrentCompanyId() + "/clients";
      if (pageSize && pageNr) {
        if (searchTerm) {
          url = url + "?pageSize=" + pageSize + "&pageNr=" + pageNr + "&searchTerm=" + searchTerm;
        } else {
          url = url + "?pageSize=" + pageSize + "&pageNr=" + pageNr;
        }
      }
      return requestService.ttGet(url);
    },
    get: function(client) {
      var url = "companies/" + dataService.getCurrentCompanyId() + "/clients/" + client.id;
      return requestService.ttGet(url);
    },
    create: function(client) {
      var url = "companies/" + dataService.getCurrentCompanyId() + "/clients";
      client.companyId = dataService.getCurrentCompanyId();
      //ticket.assignedToUserID = dataService.getUserId();
      console.log(client);

      return requestService.ttPost(url, client);
    },
    update: function(client) {
      var url = "companies/" + dataService.getCurrentCompanyId() + "/clients/"+client.id;
      var args = {};
      args.companyId = dataService.getCurrentCompanyId();
      args.contactProfile = client.contactProfile;
      return requestService.ttPut(url, args);
    },
    updateProfile: function(client) {
      var url;
      url = "companies/" + dataService.getCurrentCompanyId() + "/clients/" + client.id + "/profile";
      return requestService.ttPut(url, client.contactProfile);
    },
    delete: function(client) {
      var url;
      url = "companies/" + dataService.getCurrentCompanyId() + "/clients/" + client.id;
      return requestService.ttDelete(url);
    }
  };
});