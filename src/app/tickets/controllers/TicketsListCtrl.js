'use strict';

angular
  .module('inspinia')
  .controller('TicketsListCtrl', function() {
    // View
    var vm = this;

    // Actions for selected tickets
    vm.ticketsActions = ['Delete'];
  });
