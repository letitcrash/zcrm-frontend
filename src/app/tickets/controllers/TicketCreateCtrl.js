'use strict';

angular
  .module('inspinia')
  .controller('TicketCreateCtrl', function($log, $state, $stateParams, ticketsAPI) {
    // View
    var vm = this;

    // Model
    vm.model = {subject: '', description: '',  status: 1, priority: 0};
    // TODO: Move it to directive
    // Ticket statuses
    vm.statuses = {
      active: 0,
      list: [
        {id: 1, title: 'New', color: 'btn-danger'},
        {id: 2, title: 'In progress', color: 'btn-success'},
        {id: 3, title: 'Postponed', color: 'btn-info'},
        {id: 4, title: 'Closed', color: 'btn-primary'}
      ]
    };
    // TODO: Move it to directive
    // Ticket priority
    vm.priority = {
      active: 0,
      list: [
        {id: 0, title: 'Low', color: 'btn-default'},
        {id: 1, title: 'Middle', color: 'btn-info'},
        {id: 2, title: 'High', color: 'btn-warning'},
        {id: 3, title: 'ASAP', color: 'btn-danger'}
      ]
    };
    vm.setStatus = function setStatus(i) {
      vm.statuses.active = i;
      vm.model.status = vm.statuses.list[i].id;
    };
    vm.setPriority = function setPriority(i) {
      vm.priority.active = i;
      vm.model.priority = vm.priority.list[i].id;
    };

    // Create ticket
    vm.createTicket = function createTicket() {
      $log.log(vm.model);
      ticketsAPI.create(vm.model).then(function(res) {
        $log.log(res);
      }, function(res) { $log.log(res); });
    };
  });
