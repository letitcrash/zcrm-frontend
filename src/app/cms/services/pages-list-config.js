'use strict';

angular
  .module('inspinia')
  // Configuration service for crmPagesList* directives
  .value('pagesListConf', {
    // GET params for pages list
    params: {sort: 'title', order: 'desc'}
  });