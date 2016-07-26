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
        ticketService) {
    // View
    var vm = this;

    // View title
    $scope.mbox.header = {
      icon: 'fa-envelope-o',
      title: 'Messages to attach',
      search: {placeholder: 'Search tickets'},
      createNew: {title: 'New ticket'},
      state: 'ambox'
    };

    // Selected messages
    vm.msgs = mailboxService.getSelectedMsgs();
    // Tickets
    vm.tickets = [];

    // Get tickets list
    vm.getTickets = function getTickets() {
      ticketService.getList(false, 10, 1).then(function(res) {
        $log.log("Got tickets");
        $log.log(res);
        vm.tickets = res;
      }, function() { $log.log("Could not get tickets"); });
    };

    // Select ticket
    vm.selectTicket = function selectTicket(ticket) { vm.ticketId = ticket.id; };

    // Remove message from selected list
    vm.removeMsg = function removeMsg() {
      $state.go('index.mail.inbox', {mailboxId: $scope.mbox.mailboxId});
    };

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
    //   sender: 'rowanemployeecomm@rowancompanies.com',
    //   received: 1436547049000,
    //   preview: 'Test preview',
    //   id: 267
    // }];
    // TODO: disable test data

    vm.getTickets();
  });
