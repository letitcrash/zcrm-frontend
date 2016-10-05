'use strict';

angular
  .module('inspinia')
  // Directive for displaying tickets list
  .directive('crmTicketsList', function($log, ticketsListConf, ticketsAPI) {
    return {
      restrict: 'A',
      scope: {},
      templateUrl: 'app/tickets/directives/tickets-list.html',
      link: function(scope) {
        // Loading statuses
        // 0 - error, 1 - success, 2 - loading
        scope.loadStats = {list: 1};

        // Ticket fields(Ticket list columns)
        scope.fields = [
          {name: 'id', title: '#'},
          {name: 'status', title: 'Status'},
          {name: 'priority', title: 'Priority'},
          {name: 'subj', title: 'Title'},
          {name: 'requesters', title: 'Client(s)'},
          {name: 'teams', title: 'Team(s)'},
          {name: 'members', title: 'Agent(s)'},
          {name: 'project', title: 'Project'},
          {name: 'created', title: 'Created'},
          {name: 'deadline', title: 'Deadline'}
        ];

        scope.today = new Date();

        // Tickets list
        scope.tickets = [];

        // GET params for ticket list
        scope.params = ticketsListConf.params;

        // Pagination settings
        scope.pages = ticketsListConf.pages;

        // Get tickets
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
