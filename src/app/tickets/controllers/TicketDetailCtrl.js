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

    // Models
    // Original
    vm.origModel = ticketModel.model;
    // For on page editing
    vm.formModel = ticketModel.model;
    // For sending to server
    vm.sendModel = ticketModel.model;
    ticketModel.clear();

    // Map received model to scope models;
    function mapModels(newModel) {
      vm.origModel = newModel;
      angular.copy(newModel, vm.formModel);
      angular.copy(newModel, vm.sendModel);
    }

    // Get ticket
    vm.getTicket = function getTicket() {
      ticketsAPI.get(vm.ticketId).then(function(res) {
        $log.log(res);
        mapModels(res);
        vm.loadStats.page = 1;
      }, function(res) {
        $log.log(res);
        vm.loadStats.page = 0;
      });
    };

    // Attached emails
    vm.emails = [];

    // TODO: Run on tab activation
    vm.getAttachedEmails = function getAttachedEmails() {
      ticketsAPI.getActions(vm.ticketId, {actionTypes: 1}).then(function(res) {
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

      ticketsAPI.delete(vm.ticketId).then(function(res) {
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
