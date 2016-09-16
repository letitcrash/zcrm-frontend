'use strict';

angular
  .module('inspinia')
  .controller('TicketCreateCtrl', function($log, $state, $stateParams, ticketsAPI, projectService) {
    // View
    var vm = this;

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
      $log.log(vm.model);
      ticketsAPI.create(vm.project, vm.model).then(function(res) {
        $log.log(res);
      }, function(res) { $log.log(res); });
    };
  });
