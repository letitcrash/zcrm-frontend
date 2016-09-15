'use strict';
angular.module('inspinia').factory('cmsService', function(requestService) {
  console.log("newsService initializing");
  return {
    getList: function(force, pageSize, pageNr, searchTerm) {
      var url;
      url = "news/search";
      
      return requestService.ttGet(url);
    },
    update: function(newsitem) {
      var url;
      url = "news/" + newsitem.id;
      return requestService.ttPut(url, newsitem);
    },
    get: function(id) {
      var url;
      url = "news/" + id;
      return requestService.ttGet(url);
    },
    post: function(addNews) {
      var url, args;
      url = "news/add";
      args = {};
        args.title =        addNews.title;
        args.date =         addNews.date;
        args.author =       addNews.author;
        args.description =  addNews.description;
        args.text =         addNews.text;
        args.tags =         addNews.tags;
        args.permission =   addNews.permission;
      return requestService.ttPost(url, args);
    }
  };
});
