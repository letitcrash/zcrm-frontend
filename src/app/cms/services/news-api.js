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

      put: function (article) {
        var url = "news/edit/" + article.id;

        var request = {
          title: article.title,
          desc: article.description,
          text: article.text,
          tags: article.tags,
          image: article.image
        };

        return requestService.ttPut(url, request);
      }
    };
  });
