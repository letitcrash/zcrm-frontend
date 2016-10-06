'use strict';

angular
  .module('inspinia')
  .factory('articlesApi', function (requestService) {
    return {
      getList: function () {
        var url = "company/:companyId/articles/search";
        return requestService.ttGet(url);
      },

      get: function (id) {
        var url = "articles/get/" + id;
        return requestService.ttGet(url);
      },

      post: function (article) {
        var url = "articles/add";
        return requestService.ttPost(url, article);
      },

      put: function (request) {
        var url = "articles/edit/" + request.id;
        return requestService.ttPut(url, request);
      },

      deleteArticle: function (id) {
        var url = "articles/delete/" + id;
        return requestService.ttDelete(url);
      }
    };
  });
