'use strict';

angular
  .module('inspinia')
  .factory('ticketModel', function () {
    function Ticket() {
      this.companyId = null;
      this.subject = '';
      this.description = '';
      this.status = 1;
      this.priority = 0;
      this.agents = [];
      this.clients = [];
      this.teams = [];
      this.project = null;
      this.deadline = null;
    }

    return {
      get: function () { return new Ticket(); }
    }
  });
