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
    vm.loadStats = {page: 2, del: 1, status: 1, priority: 1, description: 1, subject: 1, deadline: 1};

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
    vm.uiTogglers = {options: false, del: false, description: false, subject: false, deadline: false};

    // Models
    // Original
    vm.origModel = ticketModel.model;
    // For on page editing
    vm.formModel = ticketModel.model;
    // For sending to server
    vm.sendModel = ticketModel.model;
    // Deadline time model
    vm.deadlineTime = null;
    ticketModel.clear();

    // Map received model to scope models;
    function mapModels(newModel) {
      vm.origModel = newModel;
      angular.merge(vm.formModel, newModel);
      angular.merge(vm.sendModel, newModel);

      if (angular.isNumber(newModel.deadline))
        vm.deadlineTime = new Date(newModel.deadline);
    }

    // Rollback formModel field value
    vm.rollbackField = function rollbackField(field) {
      vm.formModel[field] = vm.origModel[field];
      vm.uiTogglers[field] = false;
    };

    // Delete ticket deadline
    vm.deleteDeadline = function deleteDeadline() {
      vm.deadlineTime = null;
      vm.formModel.deadline = vm.sendModel.deadline = null;
      vm.updateTicket('deadline');
    };

    // Update ticket after status and priority changes
    $scope.$watch('tsDetail.formModel.status', function(val) {
      if (val !== vm.origModel.status) {
        vm.sendModel.status = val;
        vm.updateTicket('status');
      }
    });

    $scope.$watch('tsDetail.formModel.priority', function(val) {
      if (val !== vm.origModel.priority) {
        vm.sendModel.priority = val;
        vm.updateTicket('priority');
      }
    });

    // Update deadline date only if edited time is valid
    $scope.$watch('tsDetail.deadlineTime', function(val) {
      if (angular.isDate(val))
        vm.formModel.deadline = val;
    });

    // Pass updated deadline as UNIX time
    $scope.$watch('tsDetail.formModel.deadline', function(val) {
      if (angular.isDate(val))
        vm.sendModel.deadline = val.getTime();
    });

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

    // Update ticket
    vm.updateTicket = function updateTicket(field) {
      vm.loadStats[field] = 2;

      if (vm.uiTogglers.hasOwnProperty(field))
        vm.uiTogglers[field] = false;

      ticketsAPI.update(vm.sendModel).then(function(res) {
        vm.loadStats[field] = 1;
        mapModels(res);
      }, function(res) {
        $log.log(res);
        mapModels(res);
        vm.loadStats[field] = 0;
      });
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

    vm.getTicket();
    vm.getAttachedEmails();
  });
