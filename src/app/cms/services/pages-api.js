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

      post: function (page) {
        var url = "pages/add";
        return requestService.ttPost(url, page);
      },

      put: function (id, page) {
        var url = "pages/edit/" + id;
        return requestService.ttPut(url, page);
      },

      deletePage: function (id) {
        var url = "pages/delete/" + id;
        return requestService.ttDelete(url);
      }
    };
  });
