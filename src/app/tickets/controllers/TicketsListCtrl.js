'use strict';

angular
  .module('inspinia')
  .controller('TicketsListCtrl', function($log, $scope, ticketsAPI, ticketPriorityConf) {
    // View
    var vm = this;

    // Tickets sorting options
    vm.sortOpts = [
      {param: 'id', title: 'ID'},
      {param: 'subj', title: 'Title'},
      {param: 'priority', title: 'Priority'},
      {param: 'created', title: 'Creation date'},
      {param: 'deadline', title: 'Deadline'}
    ];
    // Sort order options
    vm.sortOrders = ['asc', 'desc'];
    // Actions for selected tickets
    vm.ticketsActions = ['Delete'];
    // Tickets list
    vm.tickets = [];
    // Ticket fields(Ticket list columns)
    vm.ticketFields = [
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
    // Ticket priority labels
    vm.ticketPriority = ticketPriorityConf.labels;
    // Today
    vm.today = new Date();

    // GET params for ticket list
    vm.getParams = {sort: 'id', order: 'desc', priority: null, pageSize: 0, pageNr: 0};

    // Pagination settings
    vm.pages = {current: 1, size: 10, itemsTotal: 0};

    // Loading statuses
    // 0 - error, 1 - success, 2 - loading
    vm.loadStats = {list: 1};

    // Get tickets on sorting, pagination or priority change
    $scope.$watchGroup(['ts.getParams.order', 'ts.getParams.priority', 'ts.getParams.sort', 'ts.pages.current'],
        function() { vm.getTickets(); });

    // Get tickets
    vm.getTickets = function getTickets() {
      vm.loadStats.list = 2;
      vm.getParams.pageSize = vm.pages.size;
      vm.getParams.pageNr = vm.pages.current;

      ticketsAPI.getList(vm.getParams).then(function(res) {
        $log.log(res);
        if (res.hasOwnProperty('data')) {
          vm.tickets = res.data;
          vm.pages.itemsTotal = res.totalCount;
          vm.loadStats.list = 1;
        } else {
          vm.loadStats.list = 0;
          $log.log(res);
        }
      }, function(res) {
        vm.loadStats.list = 0;
        $log.log(res);
      });
    };
  });
