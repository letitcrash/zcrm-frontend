'use strict';

angular
  .module('inspinia')
  .controller('TicketDetailCtrl', function($log, $state, $stateParams, $scope, ticketsAPI, ticketModel,
        textFromHTMLFilter) {
    // View
    var vm = this;

    // Selected ticket ID
    vm.ticketId = $state.params.ticketId;

    // Loading statuses
    // 0 - error, 1 - success, 2 - loading
    vm.loadStats = {page: 2, del: 1};

    // Tab panel
    vm.tabs = [
      {icon: 'fa-file-text-o', title: 'Description', disabled: false, template: 'app/tickets/detail-descr.html'},
      {icon: 'fa-comments-o', title: 'Messages', disabled: true},
      {icon: 'fa-envelope', title: 'E-mail', disabled: false, template: 'app/tickets/detail-email.html'},
      {icon: 'fa-user', title: 'People', disabled: false, template: 'app/tickets/detail-people.html'},
      {icon: 'fa-paperclip', title: 'Files', disabled: true},
      {icon: 'fa-history', title: 'History', disabled: true}
    ];
    vm.activeTab = 3;

    // Togglers for UI elements
    vm.uiTogglers = {options: false, del: false}

    // Model
    vm.model = ticketModel.model;
    ticketModel.clear();

    // Attached emails
    vm.emails = [];

    // Get ticket
    vm.getTicket = function getTicket() {
      ticketsAPI.get(vm.ticketId).then(function(res) {
        $log.log(res);
        vm.model = res;
        vm.loadStats.page = 1;
      }, function(res) {
        $log.log(res);
        vm.loadStats.page = 0;
      });
    };

    // TODO: Run on tab activation
    vm.getAttachedEmails = function getAttachedEmails() {
      ticketsAPI.getActions(vm.ticketId, [1]).then(function(res) {
        $log.log(res);
        vm.emails = res;
        vm.emails.forEach(function(item) {
          item.mail.preview = textFromHTMLFilter(item.mail.body);
          item.mail.active = false;
        });
      }, function(res) { $log.log(res); });
    };

    // Delete ticket
    vm.deleteTicket = function deleteTicket() {
      vm.uiTogglers.del = false;
      vm.uiTogglers.options = false;
      vm.loadStats.del = 2;

      ticketsAPI.delete(vm.model).then(function(res) {
        $log.log(res);
        $state.go('^.list');
      }, function(res) {
        $log.log(res);
        vm.loadStats.del = 0;
      });
    };

    vm.getTicket();
    vm.getAttachedEmails();
  });
