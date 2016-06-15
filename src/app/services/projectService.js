'use strict';
angular.module('inspinia').factory('projectService', function(requestService, dataService) {
	
	var getListRequest;
	getListRequest = function(pageSize, pageNr, searchTerm) {
	  var url;
	  if (pageSize !== void 0 && pageNr !== void 0) {
		if (searchTerm) {
		  url = "companies/" + dataService.getUserId() + "/projects?pageSize=" + pageSize + "&pageNr=" + pageNr + "&searchTerm=" + searchTerm;
		} else {
		  url = "companies/" + dataService.getUserId() + "/projects?pageSize=" + pageSize + "&pageNr=" + pageNr;
		}
	  } else {
		url = "companies/" + dataService.getUserId() + "/projects";
	  }
	  return requestService.ttGet(url);
	};
	
	return {
		getList: function(force, pageSize, pageNr, searchTerm) {
		  return getListRequest(pageSize, pageNr, searchTerm)
		},
		get: function(projectId) {
      var url = "companies/" + dataService.getCurrentCompanyId() + "/projects/" + projectId;
      return requestService.ttGet(url);
    },
    create: function(project) {
      var url = "companies/" + dataService.getCurrentCompanyId() + "/projects";
      project.companyId = dataService.getCurrentCompanyId();
      //ticket.assignedToUserID = dataService.getUserId();
      return requestService.ttPost(url, project);
    },
    update: function(project) {
      var url = "companies/" + dataService.getCurrentCompanyId() + "/projects/"+project.id;
      var args = {};
      args.id=project.id;
      args.companyId = dataService.getCurrentCompanyId();
      args.name = project.name;
      args.description = project.description;

      return requestService.ttPut(url, project);
    },
    delete: function(id) {
      var url = "companies/" + dataService.getCurrentCompanyId() + "/projects/" + id;

      return requestService.ttDelete(url);
    }
	};
});

