'use strict';

angular
  .module('inspinia')
  .controller('TicketsListController', function($log, ticketService) {
    // View
    var vm = this;

    // Tickets sorting options
    vm.sortOpts = ['ID', 'Status', 'Priority', 'Title', 'Clients', 'Teams', 'Agents', 'Project', 'Created', 'Deadline'];
    // Actions for selected tickets
    vm.ticketsActions = ['Delete'];
    // Tickets list
    vm.tickets = [];

    // GET params for ticket list
    var getParams = {sTerm: ''};

    // Pages settings
    vm.pages = {current: 1, all: 5, onPage: 50, total: 0};

    // Get tickets
    vm.getTickets = function getTickets(pNr) {
      var page = angular.isNumber(pNr) ? pNr : 1;
      var req = ticketService.getList;

      if (getParams.sTerm.length > 0) { ticketService.list.search(getParams.sTerm); }

      req.get(vm.pages.onPage, page).then(function(res) {
        $log.log(res);

        if (res.data.length > 0) { vm.tickets = res.data; }
      }, function() { $log.log('Couldn\'t get ticket list'); });
    };

    vm.getTickets();
  });
