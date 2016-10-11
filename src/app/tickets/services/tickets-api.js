'use strict';

angular
  .module('inspinia')
  .factory('ticketsAPI', function(requestService, dataService) {
    var apiURL = 'companies/:companyId/tickets';

    return {
      getList: function(params) { return requestService.ttGet(apiURL, params); },
      get: function(ticketId) { return requestService.ttGet(apiURL + '/' + ticketId); },
      getActions: function(ticketId, params) {
        return requestService.ttGet(apiURL + '/' + ticketId + '/actions', params);
      },
      create: function(ticket) {
        ticket.companyId = parseInt(dataService.getCurrentCompanyId());
        ticket.createdByUserId = dataService.getUserId();

        return requestService.ttPost(apiURL, ticket);
      },
      update: function(ticket) {
        return requestService.ttPut(apiURL + '/' + ticket.id, ticket);
      },
      delete: function(ticketId) { return requestService.ttDelete(apiURL + '/' + ticketId); },
      attachEmail: function(ticketId, emailId) {
        return requestService.ttPost(apiURL + '/' + ticketId + '/mails/' + emailId);
      }
    };
  });
