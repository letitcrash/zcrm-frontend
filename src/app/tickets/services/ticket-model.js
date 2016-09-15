'use strict';

angular
  .module('inspinia')
  .value('ticketModel', {
    ticket: {
      companyId: 0,
      subject: '',
      description: '',
      status: 1,
      priority: 0,
      assignedToUserId: [],
      requestedByUserId: [],
      assignedToTeamId: [],
      deadline: null
    }
  });
