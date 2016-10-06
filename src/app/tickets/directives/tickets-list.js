'use strict';

angular
  .module('inspinia')
  // Directive for displaying tickets list
  .directive('crmTicketsList', function($log, ticketsListConf, ticketsAPI) {
    return {
      restrict: 'A',
      scope: {tickets: '=?crmTicketsList', dspFields: '@?fields', onTicketSelect: '&?'},
      templateUrl: 'app/tickets/directives/tickets-list.html',
      link: function(scope) {
        // Loading statuses
        // 0 - error, 1 - success, 2 - loading
        scope.loadStats = {list: 1};

        // Ticket fields(Ticket list columns)
        scope.fields = {
          id: {title: '#', active: true},
          status: {title: 'Status', active: true},
          priority: {title: 'Priority', active: true},
          subj: {title: 'Title', active: true},
          clients: {title: 'Client(s)', active: true},
          teams: {title: 'Team(s)', active: true},
          agents: {title: 'Agent(s)', active: true},
          project: {title: 'Project', active: true},
          created: {title: 'Created', active: true},
          deadline: {title: 'Deadline', active: true}
        };

        if (angular.isString(scope.dspFields)) {
          scope.dspFields = scope.dspFields.split(',');

          for (var f in scope.fields) {
            if (hasOwnProperty.call(scope.fields, f)) {
              if (scope.dspFields.indexOf(f) === -1)
                scope.fields[f].active = false;
            }
          }
        }

        scope.today = new Date();

        scope.selectTicket = function selectTicket(ticket) {
          // TODO: Remove when multiple tickets deletion will be implemented in backend
          scope.tickets.forEach(function(t) {
            if (t.id !== ticket.id)
              t.selected = false;
          });
          // TODO: Remove when multiple tickets deletion will be implemented in backend
          ticket.selected = ticket.hasOwnProperty('selected') && ticket.selected ? false : true;

          if (angular.isFunction(scope.onTicketSelect))
            scope.onTicketSelect({ticket: ticket});
        };

        if (!angular.isArray(scope.tickets))
          scope.tickets = [];

        // GET params for ticket list
        scope.params = ticketsListConf.params;

        // Pagination settings
        scope.pages = ticketsListConf.pages;

        scope.getTickets = function getTickets() {
          scope.loadStats.list = 2;
          scope.params.pageSize = scope.pages.size;
          scope.params.pageNr = scope.pages.current;

          ticketsAPI.getList(scope.params).then(function(res) {
            $log.log(res);
            if (res.hasOwnProperty('data')) {
              scope.tickets = res.data;
              scope.pages.itemsTotal = res.totalCount;
              scope.loadStats.list = 1;
            } else {
              scope.loadStats.list = 0;
              $log.log(res);
            }
          }, function(res) {
            scope.loadStats.list = 0;
            $log.log(res);
          });
        };

        // Get tickets on sorting, pagination or priority change
        scope.$watchGroup(['params.order', 'params.priority', 'params.sort', 'pages.current'], scope.getTickets);
      }
    };
  })
