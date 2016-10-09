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
      // TODO: Remove after backend refactor
      this.emplClients = [];
      this.teams = [];
      this.project = null;
      this.deadline = null;
    }

    // Deadline time. Updates deadline field only if value is Date
    Ticket.prototype.deadlineTime = function deadlineTime(val) {
      return angular.isDate(val) ? (this.deadline = val) : this.deadline;
    };

    return {
      get: function () { return new Ticket(); }
    }
  });
