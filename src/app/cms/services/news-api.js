'use strict';

angular
  .module('inspinia')
  .factory('newsApi', function (requestService) {
    return {
      getList: function () {
        var url = "company/:companyId/news/search";
        return requestService.get(url);
      },

      getEmployeeList: function () {
        var url = "company/:companyId/news/search";
        return requestService.get(url);
      },

      get: function (id) {
        var url = "news/get/" + id;
        return requestService.get(url);
      },

      post: function (article) {
        var url = "news/add";
        return requestService.post(url, article);
      },

      put: function (id, request) {
        var url = "news/edit/" + id;
        return requestService.put(url, request);
      },

      deleteNews: function (id) {
        var url = "news/delete/" + id;
        return requestService.delete(url);
      }
    };
  });
