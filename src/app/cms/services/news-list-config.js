'use strict';

angular
  .module('inspinia')
  // Configuration service for crmNewsList* directives
  .value('newsListConf', {
    // GET params for news list
    params: {sort: 'title', order: 'desc'}
  });