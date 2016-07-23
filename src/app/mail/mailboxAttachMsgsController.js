'use strict';

angular
  .module('inspinia')
  .controller("MailboxAttachMsgsController", function($log, $scope, $rootScope, $state, $stateParams, $sanitize,
        mailboxService, ticketService) {
    // View
    var vm = this;

    // View title
    $scope.mbox.header = {
      icon: 'fa-envelope-o',
      title: 'Selected messages',
      search: {placeholder: 'Search tickets'},
      btn: {title: 'New ticket', icon: 'fa-plus'},
      state: 'ambox'
    };

    // Selected messages
    vm.msgs = mailboxService.getSelectedMsgs();
    // Tickets
    vm.tickets = [];
    $log.log(mailboxService.getSelectedMsgs());

    // Get tickets list
    vm.getTickets = function getTickets() {
      ticketService.getList(false, 10, 1).then(function(res) {
        $log.log("Got tickets");
        $log.log(res);
        vm.tickets = res;
      }, function() { $log.log("Could not get tickets"); });
    };

    // TODO: disable test data
    for (var i = 1; i < 41; i++) { vm.tickets.push({id: '0000' + 19 + i, subject: 'Test ' + i}) }
    // TODO: disable test data

    // vm.getTickets();
  });
