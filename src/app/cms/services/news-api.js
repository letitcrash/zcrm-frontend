'use strict';

angular
  .module('inspinia')
  .factory('newsApi', function ($log, requestService) {
    return {
      getList: function () {
        var url = "company/:companyId/news/search";
        return requestService.ttGet(url);
      },

      get: function (id) {
        var url = "news/get/" + id;
        return requestService.ttGet(url);
      },

      post: function (article) {
        var url = "news/add";
        return requestService.ttPost(url, article);
      },

      put: function (request) {
        var url = "news/edit/" + request.id;
        return requestService.ttPut(url, request);
      },

      deleteNews: function (id) {
        var url = "news/delete/" + id;
        return requestService.ttDelete(url);
      }
    };
  });
