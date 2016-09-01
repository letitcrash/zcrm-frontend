'use strict';

angular
  .module('inspinia')
  .controller('TicketsFormController', function($log, $state, $stateParams, ticketService) {
    // View
    var vm = this;

    // Model
    vm.model = {subject: '', description: '', clients: [], teams: [], agents: [], status: 1, priority: 0, project: ''};

    // Create ticket
    vm.createTicket = function createTicket() {
      $log.log(vm.model);
      ticketService.create(vm.model).then(function(res) {
        $log.log(res);
      }, function(res) { $log.log(res); });
    };
  });
