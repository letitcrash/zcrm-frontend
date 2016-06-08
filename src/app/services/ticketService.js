'use strict';
angular.module('inspinia').factory('ticketService', function(requestService, dataService) {
  return {
    getList: function(force, pageSize, pageNr, searchTerm) {
      var url;
        url = "companies/" + dataService.getCurrentCompanyId() + "/tickets";
      if (pageSize && pageNr) {
        if (searchTerm) {
          url = url + "?pageSize=" + pageSize + "&pageNr=" + pageNr + "&searchTerm=" + searchTerm;
        } else {
          url = url + "?pageSize=" + pageSize + "&pageNr=" + pageNr;
        }
      }
      return requestService.ttGet(url);
    },
    getActionsList: function(force, pageSize, pageNr, searchTerm, ticketId) {
      var url;
        url = "companies/" + dataService.getCurrentCompanyId() + "/tickets/" + ticketId + "/actions";
      if (pageSize && pageNr) {
        if (searchTerm) {
          url = url + "?pageSize=" + pageSize + "&pageNr=" + pageNr + "&searchTerm=" + searchTerm;
        } else {
          url = url + "?pageSize=" + pageSize + "&pageNr=" + pageNr;
        }
      }
      return requestService.ttGet(url);
    },
    get: function(ticketId) {
      var url = "companies/" + dataService.getCurrentCompanyId() + "/tickets/" + ticketId;
      return requestService.ttGet(url);
    },
    create: function(ticket, mails) {
      var url = "companies/" + dataService.getCurrentCompanyId() + "/tickets";
      var args = {};
      args.companyId = dataService.getCurrentCompanyId();
      args.createdByUser = dataService.getUser();
      args.title = ticket.title;
      args.description = ticket.description;
      args.attachedMails = mails;
      args.dueDate = "today";

      return requestService.ttPost(url, args);
    },
    update: function(ticket, mails) {
      var url = "companies/" + dataService.getCurrentCompanyId() + "/tickets";
      var args = {};
      args.companyId = dataService.getCurrentCompanyId();
      args.createdByUser = dataService.getUser();
      args.subject = ticket.subject;
      args.description = ticket.description;
      args.attachedMails = mails;
      args.dueDate = "today";

      return requestService.ttPost(url, args);
    },
    detachEmailConversation: function(ticket, email) {
      var url = "companies/" + dataService.getCurrentCompanyId() + "/tickets/" + ticket.id + "/attachedmails/" + email.id;
      return requestService.ttDelete(url);
    },
    delete: function(ticket) {
      var url = "companies/" + dataService.getCurrentCompanyId() + "/tickets/" + ticket.id;

      return requestService.ttPost(url, args);
    },
    comment: function(ticket) {
      var url = "companies/" + dataService.getCurrentCompanyId() + "/tickets/" + ticket.id + "/comments";
      var args = {};
      args.companyId = dataService.getCurrentCompanyId();
      args.createdByUser = dataService.getUser();
      args.title = ticket.title;
      args.description = ticket.description;
      args.attachedMails = mails;
      args.dueDate = "today";

      return requestService.ttPost(url, args);
    },
    attachEmailConversation: function(ticket, email) {
      var url = "companies/" + dataService.getCurrentCompanyId() + "/tickets/" + ticket.id + "/mails" + email.id;
      var args = {};
      args.companyId = dataService.getCurrentCompanyId();
      args.createdByUser = dataService.getUser();
      args.title = ticket.title;
      args.description = ticket.description;
      args.attachedMails = mails;
      args.dueDate = "today";

      return requestService.ttPost(url, args);
    }
  };
});