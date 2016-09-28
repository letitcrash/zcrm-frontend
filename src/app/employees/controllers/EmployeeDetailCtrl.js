'use strict';

angular
  .module('inspinia')
  .controller('EmployeeDetailCtrl', function($log, $state, $stateParams, employeesAPI, employeeModel, dataService) {
    // View
    var vm = this;

    // Selected employee ID
    vm.empId = $state.params.empId;

    // Loading statuses
    // 0 - error, 1 - success, 2 - loading
    vm.loadStats = {page: 2};

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

    // Current company
    vm.company = dataService.getCurrentCompanyStr();

    // Map received model to scope models;
    function mapModels(newModel) {
      vm.origModel = newModel;
    }

    // Get Employee
    vm.getEmp = function getEmp() {
      employeesAPI.get(vm.empId).then(function(res) {
        $log.log(res);
        mapModels(res);
        vm.loadStats.page = 1;
      }, function(res) {
        $log.log(res);
        vm.loadStats.page = 0;
      });
    };

    vm.getEmp();
  });
