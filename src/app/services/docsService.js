'use strict';
angular.module('inspinia').factory('docsService', function(requestService, dataService) {
	
	
	
	var getListRequest;
	getListRequest = function(pageSize, pageNr, searchTerm) {
	  var url;
	  if (pageSize !== void 0 && pageNr !== void 0) {
		if (searchTerm) {
		  url = "users/" + dataService.getUserId() + "/files?pageSize=" + pageSize + "&pageNr=" + pageNr + "&searchTerm=" + searchTerm;
		} else {
		  url = "users/" + dataService.getUserId() + "/files?pageSize=" + pageSize + "&pageNr=" + pageNr;
		}
	  } else {
		url = "users/" + dataService.getUserId() + "/files";
	  }
	  return requestService.ttGet(url);
	};
	
	
	
	return {
		getList: function(force, pageSize, pageNr, searchTerm) {
		  return getListRequest(pageSize, pageNr, searchTerm)
		},
		deleteFile: function(id) {
    	  var url;
    	  url = "users/" + dataService.getUserId() + "/files/" + id;
  	  	  return requestService.ttDelete(url);
	  	}
	};
});

