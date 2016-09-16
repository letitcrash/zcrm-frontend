'use strict';

angular
  .module('inspinia')
  .controller('TicketsListCtrl', function($log, ticketsAPI, ticketPriorityConf) {
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
    vm.getParams = {sTerm: '', sortField: 'id', sortAsc: false, priority: -1};

    // Pages settings
    vm.pages = {current: 1, all: 5, onPage: 50, total: 0};

    // Loading statuses
    // 0 - error, 1 - success, 2 - loading
    vm.loadStats = {list: 1};

    // Get tickets on sort options change
    vm.onSortChange = function onSortChange(opt) {
      vm.getParams.sortField = opt.param;
      vm.getTickets();
    };

    // Filter tickets by priority
    vm.filterByPriority = function filterByPriority(id) {
      vm.getParams.priority = vm.getParams.priority === id ? -1 : id;
      vm.getTickets();
    };

    // Toggle sort order and get tickets
    vm.toggleSortOrder = function toggleSortOrder() {
      vm.getParams.sortAsc = !vm.getParams.sortAsc;
      vm.getTickets();
    };

    // Get tickets
    vm.getTickets = function getTickets(pNr) {
      var page = angular.isNumber(pNr) ? pNr : 1;
      var req = ticketsAPI.getList();

      if (vm.getParams.sTerm.length > 0) { ticketsAPI.list.search(vm.getParams.sTerm); }
      if (vm.getParams.sortField.length > 0) { req.sort(vm.getParams.sortField, vm.getParams.sortAsc); }
      if (vm.getParams.priority > -1) { req.priority(vm.getParams.priority); }

      vm.loadStats.list = 2;

      req.get(vm.pages.onPage, page).then(function(res) {
        if (res.hasOwnProperty('data')) {
          vm.tickets = res.data;
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

    vm.getTickets();
  });
