'use strict';

angular
  .module('inspinia')
  .factory('articlesApi', function (requestService) {
    return {
      getList: function () {
        var url = "company/:companyId/articles/search";
        return requestService.get(url);
      },

      get: function (id) {
        var url = "articles/get/" + id;
        return requestService.get(url);
      },

      post: function (article) {
        var url = "articles/add";
        return requestService.post(url, article);
      },

      put: function (id, request) {
        var url = "articles/edit/" + id;
        return requestService.put(url, request);
      },

      deleteArticle: function (id) {
        var url = "articles/delete/" + id;
        return requestService.delete(url);
      }
    };
  });
