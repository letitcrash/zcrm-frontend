'use strict';

angular
  .module('inspinia')
  .controller('EmployeeDetailCtrl', function($log, $state, $stateParams, $scope, $uibModal, employeesAPI, employeeModel, dataService) {
    // View
    var vm = this;

    // Selected employee ID
    vm.empId = $state.params.empId;

    // Loading statuses
    // 0 - error, 1 - success, 2 - loading
    vm.loadStats = {page: 2, edit: 1};

    // Tab panel
    vm.tabs = [
      {icon: 'fa-users', title: 'Teams', disabled: true},
      {icon: 'fa-check', title: 'Tickets', disabled: true},
      {icon: 'fa-history', title: 'History', disabled: true},
      {icon: 'fa-clock-o', title: 'Time log', disabled: true}
    ];
    vm.activeTab = 2;

    // Models
    // Original
    vm.origModel = employeeModel.get();
    // For on page editing
    vm.formModel = employeeModel.get();

    // Current company
    vm.company = dataService.getCurrentCompanyStr();

    // Dialog edit forms
    vm.dialogs = {
      mainInfo: {
        templateUrl: 'mainInfoEdit.html',
        label: 'main',
        open: createDialog
      },
      unionInfo: {
        templateUrl: 'unionInfoEdit.html',
        label: 'union',
        size: 'lg',
        open: createDialog
      },
      workInfo: {
        templateUrl: 'workInfoEdit.html',
        label: 'work',
        size: 'lg',
        open: createDialog
      },
      privatInfo: {
        templateUrl: 'privatInfoEdit.html',
        label: 'privat',
        size: 'lg',
        open: createDialog
      }
    };

    // Create instance of $uibModal
    function createDialog() {
      /* eslint-disable angular/controller-as-vm, angular/controller-as */
      angular.extend(this, $uibModal.open({
        ariaLabelledBy: this.label + '_info_dlg_title',
        ariaDescribedBy: this.label + '_info_dlg_body',
        size: this.hasOwnProperty('size') ? this.size : '',
        controller: function($scope) {
          $scope.model = vm.formModel;

          // Land options
          $scope.land = [{name: 'Offshore', val: false}, {name: 'Onshore', val: true}];

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

      // Update Employee with changed formModel
      this.result.then(function() { vm.updateEmp(); });
      /* eslint-enable angular/controller-as-vm, angular/controller-as */
    }

    // Map received model to scope models;
    function mapModels(newModel) {
      angular.merge(vm.origModel, newModel);
      angular.copy(vm.origModel, vm.formModel);
    }

    // Get Employee
    vm.getEmp = function getEmp() {
      employeesAPI.get(vm.empId).then(function(res) {
        $log.log(res);

        // TODO: Delete after backend refactor
        if (!res.hasOwnProperty('additionalInfo'))
          res.additionalInfo = {emplId: res.id};

        mapModels(res);
        vm.loadStats.page = 1;
      }, function(res) {
        $log.log(res);
        vm.loadStats.page = 0;
      });
    };

    // Update Employee
    vm.updateEmp = function updateEmp() {
      vm.loadStats.edit = 2;

      employeesAPI.update(vm.formModel).then(function(res) {
        $log.log(res);
        mapModels(res);
        vm.loadStats.edit = 1;
      }, function(res) {
        $log.log(res);
        vm.loadStats.edit = 0;
      });
    };

    vm.getEmp();
  });
