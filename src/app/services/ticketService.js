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
    getActions: function(ticket, actionsList) {
      var url = "companies/" + dataService.getCurrentCompanyId() + "/tickets/" + ticket.id + "/actions";
      return requestService.ttGet(url);
    },
    create: function(ticket) {
      var url = "companies/" + dataService.getCurrentCompanyId() + "/tickets";
      ticket.companyId = dataService.getCurrentCompanyId();
      ticket.projectId = Number(1);
      ticket.createdByUserId = dataService.getUserId();
      //ticket.assignedToUserID = dataService.getUserId();
      ticket.status = Number(ticket.status.selectedOption.id);
      ticket.priority = Number(ticket.priority.selectedOption.id);

      console.log(ticket);

      return requestService.ttPost(url, ticket);
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
    setStatus: function(status, ticket) {
      var args = {};
      args.status = Number(status.id);
      args.id = Number(ticket.id);
      var url = "companies/" + dataService.getCurrentCompanyId() + "/tickets/" + ticket.id + "/status";
      return requestService.ttPut(url,args);
    },
    setPriority: function(priority, ticket) {
      var args = {};
      args.priority = Number(priority.id);
      args.id = Number(ticket.id);
      var url = "companies/" + dataService.getCurrentCompanyId() + "/tickets/" + ticket.id + "/priority";
      return requestService.ttPut(url,args);
    },
    commentTicket: function(ticket) {
      var args = {};
      args.actionType = Number(0);
      args.comment = ticket.comment;
      //args.parentActionId = Number(ticket.id);
      args.ticketId = Number(ticket.id);
      args.user = dataService.getUser();
      var url = "companies/" + dataService.getCurrentCompanyId() + "/tickets/" + ticket.id + "/comments";
      return requestService.ttPost(url,args);
    },
    addMembersToTicket: function(ticket) {
      var args = {};
      args.members = ticket.members;
      ticket.ticketId = Number(ticket.id);
      var url = "companies/" + dataService.getCurrentCompanyId() + "/tickets/" + ticket.id + "/members";
      return requestService.ttPost(url,ticket);
    },
    addTeamsToTicket: function(ticket) {
      var args = {};
      args.members = ticket.members;
      ticket.ticketId = Number(ticket.id);
      var url = "companies/" + dataService.getCurrentCompanyId() + "/tickets/" + ticket.id + "/teams";
      return requestService.ttPost(url,ticket);
    },
    detachEmailConversation: function(ticket, email) {
      var url = "companies/" + dataService.getCurrentCompanyId() + "/tickets/" + ticket.id + "/attachedmails/" + email.id;
      return requestService.ttDelete(url);
    },
    delete: function(ticket) {
      var url = "companies/" + dataService.getCurrentCompanyId() + "/tickets/" + ticket.id;

      return requestService.ttDelete(url);
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