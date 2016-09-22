'use strict';
angular.module('inspinia').factory('cmsService', function(requestService) {
  console.log("newsService initializing");
  return {
    
//  News
    
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
        if(addNews.image)
          args.image = addNews.image;

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
        args.image =        article.image;
      return requestService.ttPut(url, args);
    },
    
    //  Pages
    
    getPagesList: function(force, pageSize, pageNr, searchTerm) {
      var url;
      url = "pages/search";
      
      return requestService.ttGet(url);
    },
    getPage: function(id) {
      var url;
      url = "pages/get/" + id;
      return requestService.ttGet(url);
    },
    postPage: function(addPage) {
      var url, args;
      url = "pages/add";
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
    putPage: function(page) {
      var url, args;
      url = "pages/edit/" + page.id;
      args = {};
      args.title =         page.title;
      args.desc =          page.desc;
      args.text =          page.text;
      args.tags =          page.tags;
      return requestService.ttPut(url, args);
    },
  };
});
