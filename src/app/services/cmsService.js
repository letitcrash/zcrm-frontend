'use strict';
angular.module('inspinia').factory('cmsService', function(requestService) {
  console.log("newsService initializing");
  return {
    getList: function(force, pageSize, pageNr, searchTerm) {
      var url;
      url = "news/search";
      
      return requestService.ttGet(url);
    },
    get: function(id) {
      var url;
      url = "news/get/" + id;
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
    },
    put: function(article) {
      var url, args;
      url = "news/edit/" + article.id;
      args = {};
        args.title =        article.title;
        args.desc =         article.desc;
        args.text =         article.text;
        args.tags =         article.tags;
      return requestService.ttPut(url, args);
    }
  };
});
