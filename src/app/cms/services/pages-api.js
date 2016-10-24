'use strict';

angular
  .module('inspinia')
  .factory('pagesApi', function ($log, requestService) {
    return {
      getList: function () {
        var url = "company/:companyId/pages/search";
        return requestService.get(url);
      },

      get: function (id) {
        var url = "pages/get/" + id;
        return requestService.get(url);
      },

      post: function (page) {
        var url = "pages/add";
        return requestService.post(url, page);
      },

      put: function (page) {
        var url = "pages/edit";
        return requestService.put(url, page);
      },

      delete: function (id) {
        var url = "pages/delete/" + id;
        return requestService.delete(url);
      }
    };
  });
