'use strict';

angular
  .module('inspinia')
  // Configuration service for crmTicketsList* directives
  .value('ticketsListConf', {
    // GET params for ticket list
    params: {sort: 'id', order: 'desc', priority: null, pageSize: 0, pageNr: 0},
    // Pagination settings
    pages: {current: 1, size: 10, itemsTotal: 0}
  });
