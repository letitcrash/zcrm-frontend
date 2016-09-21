'use strict';

angular
  .module('inspinia')
  .controller('TicketCreateCtrl', function($log, $state, $stateParams, ticketModel, ticketsAPI, projectService, teamService) {
    // View
    var vm = this;

    // Loading statuses
    // 0 - error, 1 - success, 2 - loading
    vm.loadStats = {form: 1};

    // Model
    vm.model = ticketModel.model;
    ticketModel.clear();

    // Projects
    vm.projects = [];

    // Get projects
    vm.getProjects = function getProjects(search) {
      // TODO: Rewrite projectService for pacing search term only
      projectService.getList(null, 1000, 1, search).then(function(res) { vm.projects = res.data; });
    };

    // Teams
    vm.teams = [];

    // Get teams
    vm.getTeams = function getTeams(search) {
      // TODO: Rewrite teamService for pacing search term only
      teamService.getList(null, 1000, 1, search).then(function(res) { vm.teams = res.data; });
    };

    // Create ticket
    vm.createTicket = function createTicket() {
      vm.loadStats.form = 2;
      ticketsAPI.create(vm.model.project.id, vm.model).then(function(res) {
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
