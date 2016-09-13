'use strict';

angular
  .module('inspinia')
  .controller('TicketsListCtrl', function($log, ticketsAPI) {
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
    // Today
    vm.today = new Date();

    // GET params for ticket list
    vm.getParams = {sTerm: '', sortField: 'id', sortAsc: false};

    // Pages settings
    vm.pages = {current: 1, all: 5, onPage: 50, total: 0};

    // Get tickets on sort options change
    vm.onSortChange = function onSortChange(opt) {
      vm.getParams.sortField = opt.param;
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

      req.get(vm.pages.onPage, page).then(function(res) {
        $log.log(res);

        if (res.data.length > 0) { vm.tickets = res.data; }
      }, function() { $log.log('Couldn\'t get ticket list'); });
    };

    vm.getTickets();
  });
