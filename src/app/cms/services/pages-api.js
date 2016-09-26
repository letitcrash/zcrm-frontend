'use strict';

angular
  .module('inspinia')
  .factory('pagesApi', function ($log, requestService) {
    return {
      getList: function () {
        var url = "company/:companyId/pages/search";
        return requestService.ttGet(url);
      },

      get: function (id) {
        var url = "pages/get/" + id;
        return requestService.ttGet(url);
      },

      post: function (addPage) {
        var url = "pages/add"
        var args = {};
        args.title = addPage.title;
        args.date = addPage.date;
        args.author = addPage.author;
        args.description = addPage.description;
        args.text = addPage.text;
        args.tags = addPage.tags;
        args.permission = addPage.permission;

        return requestService.ttPost(url, args);
      },

      put: function (page) {
        var url = "pages/edit/" + page.id;
        var args = {};
        args.title = page.title;
        args.desc = page.desc;
        args.text = page.text;
        args.tags = page.tags;

        return requestService.ttPut(url, args);
      }
    };
  });
