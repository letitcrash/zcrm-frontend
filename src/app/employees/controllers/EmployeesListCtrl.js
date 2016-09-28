'use strict';

angular
  .module('inspinia')
  .controller('EmployeesListCtrl', function($log, $scope, employeesAPI) {
    // View
    var vm = this;

    // Employees list
    vm.emps = [];

    // Employee fields(Employees list columns)
    vm.empFields = [
      {name: 'name', title: 'Employee'},
      {name: 'phone', title: 'Phone'},
      {name: 'email', title: 'Email'},
      {name: 'union', title: 'Union'},
      {name: 'position', title: 'Position'},
      {name: 'department', title: 'Department'},
      {name: 'shift', title: 'Shift'}
    ];

    // GET params for employees list
    vm.getParams = {pageSize: 0, pageNr: 0};

    // Pagination settings
    vm.pages = {current: 1, size: 10, itemsTotal: 0};

    // Loading statuses
    // 0 - error, 1 - success, 2 - loading
    vm.loadStats = {list: 1};

    // Get employees
    vm.getEmps = function getEmps() {
      vm.loadStats.list = 2;
      vm.getParams.pageSize = vm.pages.size;
      vm.getParams.pageNr = vm.pages.current;

      employeesAPI.all(vm.getParams).then(function(res) {
        $log.log(res);
        if (res.hasOwnProperty('data')) {
          vm.emps = res.data;
          vm.pages.itemsTotal = res.totalCount;
          vm.loadStats.list = 1;
        } else {
          vm.loadStats.list = 0;
          $log.log(res);
        }
      }, function(res) {
        vm.loadStats.list = 0;
        $log.log(res);
      });
    };

    // Get employees on pagination change
    $scope.$watch('emp.pages.current', function() { vm.getEmps(); });
  });
