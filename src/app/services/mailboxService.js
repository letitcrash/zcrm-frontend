'use strict';
angular.module('inspinia').factory('mailboxService', function(requestService, dataService) {
  return {
    getInbox: function(force, pageSize, pageNr, searchTerm) {
      var url;
        url = "companies/" + dataService.getCurrentCompanyId() + "/employees/" + dataService.getEmployments().id + "/mail/inbox";
      if (pageSize && pageNr) {
        if (searchTerm) {
          url = url + "?pageSize=" + pageSize + "&pageNr=" + pageNr + "&searchTerm=" + searchTerm;
        } else {
          url = url + "?pageSize=" + pageSize + "&pageNr=" + pageNr;
        }
      }
      return requestService.ttGet(url);
    },
    getOutbox: function(force, pageSize, pageNr, searchTerm) {
      var url;
        url = "companies/" + dataService.getCurrentCompanyId() + "/employees/" + dataService.getEmployments().id + "/mail/sentbox";
      if (pageSize && pageNr) {
        if (searchTerm) {
          url = url + "?pageSize=" + pageSize + "&pageNr=" + pageNr + "&searchTerm=" + searchTerm;
        } else {
          url = url + "?pageSize=" + pageSize + "&pageNr=" + pageNr;
        }
      }
      return requestService.ttGet(url);
    },
    post: function(email) {
      var url;
        url = "companies/" + dataService.getCurrentCompanyId() + "/employees/" + dataService.getEmployments().id + "/mail/send";
      return requestService.ttPost(url, email);
    }
  };
});

