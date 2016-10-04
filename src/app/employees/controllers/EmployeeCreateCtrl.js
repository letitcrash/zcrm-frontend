'use strict';

angular
  .module('inspinia')
  .controller('EmployeeCreateCtrl', function($log, $state, $stateParams, employeeModel, employeesAPI, dataService) {
    // View
    var vm = this;

    // Loading statuses
    // 0 - error, 1 - success, 2 - loading
    vm.loadStats = {form: 1};

    // Model
    vm.model = employeeModel.get();

    // Current company
    vm.company = dataService.getCurrentCompanyStr();

    // Land options
    vm.land = [{name: 'Offshore', val: false}, {name: 'Onshore', val: true}];

    // Visability togglers
    vm.uiTogglers = {
      resignedDate: false,
      enrolledDept: false,
      enrolledIE: false,
      enrolledLO: false,
      shopStewardCourses: false,
      voCourses: false,
      birthdate: false
    };

    // Create employee
    vm.createEmployee = function createEmployee() {
      vm.loadStats.form = 2;
      vm.model.username = vm.model.user.contactProfile.email;
      vm.model.contactProfile = vm.model.user.contactProfile;
      delete vm.model.user;
      employeeModel.validate(vm.model);

      employeesAPI.create(vm.model).then(function(res) {
        if (res.hasOwnProperty('id')) {
          vm.loadStats.form = 1;
          $state.go('^.list');
        } else {
          vm.loadStats.form = 0;
          $log.log(res);
        }
      }, function(res) {
        vm.loadStats.form = 0;
        $log.log(res);
      });
    };
  });
