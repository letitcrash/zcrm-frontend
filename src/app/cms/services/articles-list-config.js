'use strict';

angular
  .module('inspinia')
  // Configuration service for crmArticlesList* directives
  .value('articlesListConf', {
    // GET params for articles list
    params: {sort: 'title', order: 'desc'}
  });