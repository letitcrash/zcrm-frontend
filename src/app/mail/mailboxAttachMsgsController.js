'use strict';

angular
  .module('inspinia')
  .controller("MailboxAttachMsgsController", function($log, $scope, $state, $stateParams, mailboxService,
        ticketsAPI, $timeout) {
    // View
    var vm = this;

    // Page header
    var pheader = $scope.mbox.header;

    // Page header
    pheader.title.icon = 'fa fa-envelope-0';
    pheader.title.content = 'Messages';
    pheader.backBtnUrl = $state.href('index.mail.inbox', {mailboxId: $scope.mbox.mboxId});
    // pheader.refresh.func = getInbox;
    pheader.search.placeholder = 'Search tickets';
    // Create mailbox
    pheader.createNew.title = 'New ticket';

    // Selected messages
    vm.msgs = $scope.mbox.selectedMsgs;
    // Tickets
    vm.tickets = [];
    // Show tickets list
    vm.showTickets = true;
    // Show action menu
    $scope.mbox.showActionMenu = false;
    // Selected ticket
    vm.selectedTicket = null;
    // Load statuses
    // 0 - error, 1 - success, 2 - loading
    vm.loadStats = {attachForm: 1};
    // Show attach confirmation dialog
    vm.showAttachConfirm = true;

    // Get tickets list
    vm.getTickets = function getTickets() {
      ticketsAPI.getList().get(20, 1).then(function(res) {
        $log.log(res);
        if (res.hasOwnProperty('data')) { vm.tickets = res.data; }
      }, function() { $log.log("Could not get tickets"); });
    };

    // Select ticket
    vm.selectTicket = function selectTicket(ticket) {
      vm.selectedTicket = ticket.selected ? ticket : null;
      $scope.mbox.showActionMenu = ticket.selected ? true : false;
    };

    // Remove message from selected list
    vm.removeMsg = function removeMsg(idx) {
      vm.msgs.splice(idx, 1);

      if (vm.msgs.length === 0)
        $state.go('index.mail.inbox', {mailboxId: $scope.mbox.mboxId});
    };

    // Attach messages to selected ticket
    vm.attachMsgs = function attachMsgs() {
      vm.showAttachConfirm = false;
      vm.loadStats.attachForm = 2;
      ticketsAPI.attachEmail(vm.selectedTicket.id, vm.msgs[0].id).then(function(res) {
        vm.loadStats.attachForm = 1;
        $log.log(res);
      }, function(res) {
        vm.loadStats.attachForm = 0;
        $log.log(res);
      });
    };

    // Close action menu and reset ticket selection
    vm.cancelAttach = function cancelAttach() {
      vm.selectedTicket.selected = false;
      vm.selectedTicket = null;
      vm.showAttachConfirm = true;
      $scope.mbox.showActionMenu = false;
    }

    // TODO: disable test data
    // for (var i = 1; i < 41; i++) {
    //   vm.tickets.push({
    //     id: '0000' + 19 + i,
    //     status: i % 2 === 0 ? 2 : 3,
    //     priority: i % 2 === 0 ? 2 : 0,
    //     title: 'Test ' + i,
    //     project: 'Test project',
    //     created: new Date(),
    //     deadline: new Date()
    //   })
    // }
    // vm.msgs = [{
    //   subject: 'Test',
    //   sender: 'rowanemployeecomm@rowancompanies.com',
    //   received: 1436547049000,
    //   preview: 'Test preview',
    //   id: 267
    // }];
    // TODO: disable test data

    vm.getTickets();
  });
