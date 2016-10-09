'use strict';

angular
  .module('inspinia')
  .controller('TicketDetailCtrl', function($log, $state, $stateParams, $scope, $uibModal, ticketsAPI, ticketModel,
        textFromHTMLFilter) {
    // View
    var vm = this;

    // Selected ticket ID
    vm.ticketId = $state.params.ticketId;

    // Loading statuses
    // 0 - error, 1 - success, 2 - loading
    vm.loadStats = {page: 2, del: 1, status: 1, priority: 1, description: 1, subject: 1, deadline: 1, people: 1};

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
    vm.uiTogglers = {options: false, description: false, subject: false, deadline: false};

    // Models
    // Original
    vm.origModel = ticketModel.get();
    // For on page editing
    vm.formModel = ticketModel.get();
    // Deadline time model
    vm.deadlineTime = null;

    // Map received model to scope models;
    function mapModels(newModel) {
      vm.origModel = newModel;
      angular.merge(vm.formModel, newModel);
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
    var watcher = $scope.$watchGroup(['tsDetail.formModel.status', 'tsDetail.formModel.priority'], function(val) {
      if (val[0] !== vm.origModel.status)
        vm.updateTicket('status');
      else if (val[1] !== vm.origModel.priority)
        vm.updateTicket('priority');
    });

    $scope.$on('$destroy', function() { watcher(); });

    // Dialog edit forms
    vm.dialogs = {
      people: {
        templateUrl: 'peopleEditDlg.html',
        label: 'people',
        open: createDialog
      },
      deadline: {
        templateUrl: 'ticketDeadlineDlg.html',
        label: 'deadline',
        open: createDialog
      },
      ticketDel: {
        templateUrl: 'ticketDelDlg.html',
        label: 'delete',
        size: 'sm',
        resultMethod: 'delete',
        open: createDialog
      }
    };

    // Create instance of $uibModal
    function createDialog() {
      /* eslint-disable angular/controller-as-vm, angular/controller-as */
      angular.extend(this, $uibModal.open({
        ariaLabelledBy: this.label + '_dlg_title',
        ariaDescribedBy: this.label + '_dlg_body',
        size: this.hasOwnProperty('size') ? this.size : '',
        controller: function($scope) {
          $scope.model = vm.formModel;

          // Subscribe to modal close event
          $scope.$on('modal.closing', function(evt, res, isClosed) {
            if (!isClosed && $scope.form.$dirty) {
              // Dismiss dialog and rollback formModel field
              angular.copy(vm.origModel, vm.formModel);
              $scope.form.$setUntouched();
            }
          });
        },
        templateUrl: this.templateUrl
      }));

      // Update Ticket when formModel changed
      this.result.then(function() {
        if (this.hasOwnProperty('resultMethod') && this.resultMethod === 'delete')
          vm.deleteTicket();
        else
          vm.updateTicket(this.label);
      }.bind(this));
      /* eslint-enable angular/controller-as-vm, angular/controller-as */
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

    // Update ticket
    vm.updateTicket = function updateTicket(field) {
      vm.loadStats[field] = 2;

      if (vm.uiTogglers.hasOwnProperty(field))
        vm.uiTogglers[field] = false;

      // TODO: Delete after backend refactor
      if (angular.isDate(vm.formModel.deadline))
        vm.formModel.deadline = vm.formModel.deadline.getTime();

      ticketsAPI.update(vm.formModel).then(function(res) {
        vm.loadStats[field] = 1;
        mapModels(res);
      }, function(res) {
        $log.log(res);
        vm.loadStats[field] = 0;
      });
    };

    // Delete ticket
    vm.deleteTicket = function deleteTicket() {
      vm.loadStats.del = 2;
      $log.log('Deleting');

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
