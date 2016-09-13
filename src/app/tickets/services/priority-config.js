'use strict';

angular
  .module('inspinia')
  .constant('ticketPriorityConf', {
    labels: {0: 'Low', 1: 'Middle', 2: 'High', 3: 'ASAP'},
    colors: {0: 'default', 1: 'info', 2: 'warning', 3: 'danger'}
  });
