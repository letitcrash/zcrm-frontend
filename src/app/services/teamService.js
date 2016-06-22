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
    get: function(team) {
      var url;
      url = "companies/" + dataService.getCurrentCompanyId() + "/teams/" + team.id;
      return requestService.ttGet(url);
    },
    create: function(team) {
      var url;
      url = "companies/" + dataService.getCurrentCompanyId() + "/teams";
      team.companyId = dataService.getCurrentCompanyId();
      return requestService.ttPost(url, team);
    },
    update: function(team) {
      var url;
      url = "companies/"+ dataService.getCurrentCompanyId() + "/teams/" + team.id;
      return requestService.ttPut(url, team);
    },
    delete: function(team) {
      var url;
      url = "companies/" + dataService.getCurrentCompanyId() + "/teams/"+team.id;
      return requestService.ttDelete(url);
    },
    deleteMember: function(team,user) {
      var url;
      url = "companies/" + dataService.getCurrentCompanyId() + "/teams/"+team.id+"/users/"+user.id;
      return requestService.ttDelete(url);
    }    
  };
});

//# sourceMappingURL=teamService.js.map
