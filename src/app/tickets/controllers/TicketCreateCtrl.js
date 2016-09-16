'use strict';

angular
  .module('inspinia')
  .controller('TicketCreateCtrl', function($log, $state, $stateParams, ticketsAPI, projectService) {
    // View
    var vm = this;

    // Loading statuses
    // 0 - error, 1 - success, 2 - loading
    vm.loadStats = {form: 1};

    // Model
    vm.model = {subject: '', description: '',  status: 1, priority: 0};

    // Selected project
    vm.project = null;

    // Projects
    vm.projects = [];

    // Get projects
    vm.getProjects = function getProjects(search) {
      // TODO: Rewrite projectService for pacing search term only
      projectService.getList(null, 100, 1, search).then(function(res) { vm.projects = res.data; });
    };

    // Create ticket
    vm.createTicket = function createTicket() {
      vm.loadStats.form = 2;
      ticketsAPI.create(vm.project, vm.model).then(function(res) {
        if (res.hasOwnProperty('id')) {
          vm.loadStats.form = 1;
          $state.go('^.detail', {ticketId: res.id});
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
