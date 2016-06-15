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
		}
	};
});
