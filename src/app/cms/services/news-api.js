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

      post: function (addNews) {
        var url = "news/add";
        var args = {};
        args.title = addNews.title;
        args.date = addNews.date;
        args.author = addNews.author;
        args.description = addNews.description;
        args.text = addNews.text;
        args.tags = addNews.tags;
        args.permission = addNews.permission;
        args.companyId = Number(addNews.companyId);

        if (addNews.image)
          args.image = addNews.image.path;

        return requestService.ttPost(url, args);
      },

      put: function (article) {
        var url = "news/edit/" + article.id;
        var args = {};
        args.title = article.title;
        args.desc = article.desc;
        args.text = article.text;
        args.tags = article.tags;
        args.image = article.image;

        return requestService.ttPut(url, args);
      }
    };
  });
