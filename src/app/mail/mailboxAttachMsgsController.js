'use strict';

angular
  .module('inspinia')
  // Directive for visual formating ticket status
  // TODO: Move in tickets controller or in separate directive folder
  .directive('ticketStatus', function() {
    return {
      restrict: 'A',
      scope: {stat: '=ticketStatus'},
      template: '<span class="label" ng-class="labelClass">{{ labelTitle | translate }}</span>',
      link: function(scope) {
        switch (scope.stat) {
          case 1:
            scope.labelTitle = 'New';
            scope.labelClass = 'label-success';
            break;
          case 2:
            scope.labelTitle = 'Open';
            scope.labelClass = 'label-warning';
            break;
          case 3:
            scope.labelTitle = 'Postponed';
            scope.labelClass = 'label-info';
            break;
          case 4:
            scope.labelTitle = 'Resolved';
            scope.labelClass = 'label-primary';
            break;
          default:
            break;
        }
      }
    };
  })
  // Directive for visual formating ticket priority
  // TODO: Move in tickets controller or in separate directive folder
  .directive('ticketPriority', function() {
    return {
      restrict: 'A',
      scope: {prior: '=ticketPriority'},
      template: '<span class="label" ng-class="labelClass">{{ labelTitle | translate }}</span>',
      link: function(scope) {
        switch (scope.prior) {
          case 0:
            scope.labelTitle = 'Low';
            scope.labelClass = 'label-success';
            break;
          case 1:
            scope.labelTitle = 'Middle';
            scope.labelClass = 'label-warning';
            break;
          case 2:
            scope.labelTitle = 'High';
            scope.labelClass = 'label-danger';
            break;
          default:
            break;
        }
      }
    };
  })
  .controller("MailboxAttachMsgsController", function($log, $scope, $state, $stateParams, mailboxService,
        ticketService, $timeout) {
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
      ticketService.getList(false, 10, 1).then(function(res) {
        $log.log("Got tickets");
        $log.log(res);
        vm.tickets = res;
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
      $timeout(function() {
        vm.loadStats.attachForm = 1
      }, 3000);
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
    vm.msgs = [{
      subject: 'Test',
      sender: 'rowanemployeecomm@rowancompanies.com',
      received: 1436547049000,
      preview: 'Test preview',
      id: 267
    }];
    // TODO: disable test data

    vm.getTickets();
  });
