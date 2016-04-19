'use strict';
angular.module('inspinia').factory('mailboxService', function(requestService, dataService) {
  return {
    getInsetting: function(force, pageSize, pageNr, searchTerm, mailboxId) {
      var url;
        url = "users/" + dataService.getEmployments().id + "/mailboxes/" + mailboxId + "/inbox";
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
    post: function(email){
      var url;
        url = "companies/" + dataService.getCurrentCompanyId() + "/employees/" + dataService.getEmployments().id + "/mail/send";
      return requestService.ttPost(url, email);
    },
    get: function(id) {

      var url;
      url = "users/" + id + "/mailboxes";
            console.log("ID:" +url)

      return requestService.ttGet(url);
    }
  };
});

