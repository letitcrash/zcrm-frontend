'use strict';

angular
  .module('inspinia')
  .factory('ticketModel', function () {
    var ticket = {
      companyId: 0,
      subject: '',
      description: '',
      status: 1,
      priority: 0,
      agents: [],
      clients: [],
      teams: [],
      project: null,
      deadline: null
    };

    function clearModel() {
      ticket.companyId = 0;
      ticket.subject = '',
      ticket.description = '';
      ticket.status = 1;
      ticket.priority = 0;
      ticket.agents = [];
      ticket.clients = [];
      ticket.teams = [];
      ticket.project = null;
      ticket.deadline = null;
    }

    clearModel();

    return {
      clear: clearModel,
      model: ticket
    }
  });
