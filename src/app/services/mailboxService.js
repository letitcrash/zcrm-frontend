'use strict';
angular.module('inspinia').factory('mailboxService', function(requestService, dataService) {
  return {
    getInbox: function(force, pageSize, pageNr, searchTerm, mailboxId) {
      var url;
        url = "users/" + dataService.getEmployments().id + "/mailboxes/" + mailboxId + "/mails";
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
    post: function(email, mailboxId) {

      var url;
        url = "users/" + dataService.getEmployments().id + "/mailboxes/" + mailboxId + "/send";
      return requestService.ttPost(url, email);
    },
    get: function(id) {

      var url;
      url = "users/" + id + "/mailboxes";
            console.log("ID:" +url)

      return requestService.ttGet(url);
    },
    update: function(cp) {
      var url;
      url = "companies/" + cp.id;
      return requestService.ttPut(url, cp);
    },
    delete: function(id) {
      var url;
      url = "companies/" + id;
      return requestService.ttDelete(url);
    },
    create: function(mb) {
      var url;
      mb.userId = dataService.getEmployments().id;
      url = "users/" + dataService.getEmployments().id + "/mailboxes";
      return requestService.ttPost(url, mb);
    }
  };
});

