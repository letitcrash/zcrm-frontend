'use strict';

angular
  .module('inspinia')
  .constant('ticketStatusConf', {
    labels: {1: 'New', 2: 'In progress', 3: 'Postponed', 4: 'Closed'},
    colors: {1: 'danger', 2: 'success', 3: 'info', 4: 'primary'}
  });
