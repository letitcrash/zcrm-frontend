'use strict';

angular
  .module('inspinia')
  .controller('TicketsFormController', function($log, ticketService) {
    // View
    var vm = this;

    // Model
    vm.model = {subject: '', description: '', clients: [], teams: [], agents: [], status: 1, priority: 0, project: ''};

    $log.log('form controll!');
  });
