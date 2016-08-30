'use strict';

angular
  .module('inspinia')
  .controller('TicketsDetailController', function($log, $state, $stateParams, $scope, ticketService) {
    // View
    var vm = this;

    // Selected ticket ID
    vm.ticketId = $state.params.ticketId;
    // Selected ticket
    vm.ticket = null;
    // Tab panel
    vm.tabs = [
      {icon: 'fa-comments-o', title: 'Messages'},
      {icon: 'fa-envelope', title: 'E-mail'},
      {icon: 'fa-user', title: 'People'},
      {icon: 'fa-paperclip', title: 'Files'},
      {icon: 'fa-history', title: 'History'}
    ];

    // Get ticket
    vm.getTicket = function getTicket() {
      ticketService.get(vm.ticketId).then(function(res) {
        $log.log(res);
        vm.ticket = res;
      }, function() { $log.log('Couldn\'t get Ticket details'); });
    };

    vm.getTicket();
  });
