'use strict';

angular
  .module('inspinia')
  .controller('CmsCtrl', function ($state, generalUtils, newsApi, pagesApi, articlesApi, cmsPermissions) {
    var vm = this;
    cmsPermissions.call(vm);

    vm.INDEX_TAB = "index.cms";
    vm.NEWS_TAB = "index.cmsNews";
    vm.PAGES_TAB = "index.cmsPages";
    vm.EMPLOYEES_TAB = "index.cmsEmployees";
    vm.ARTICLES_TAB = "index.cmsArticles";

    init();

    vm.editNews = function (article) {
      $state.go('index.editnews', {
        articleId: article.id
      });
    };

    vm.editPage = function (page) {
      $state.go('index.editpage', {
        pageId: page.id
      });
    };

    vm.editArticle = function (article) {
      $state.go('index.editArticle', {
        articleId: article.id
      });
    };

    vm.isSet = function (tabNum) {
      return vm.tab === tabNum;
    };

    vm.displayDate = function (article) {
      var creationTime = generalUtils.formatTimestamp(article.creationTime);
      var lastModified = generalUtils.formatTimestamp(article.lastModified);
      var displayDate = creationTime;
      if(lastModified && creationTime != lastModified)
        displayDate += " (" + lastModified + ")";

      return displayDate;
    };

    vm.displayAuthor = generalUtils.formatUser;

    function getArticlesList() {
      articlesApi.getList().then(function (response) {
        vm.articles = response.data;
      })
    }

    function getNewsList() {
      newsApi.getList().then(function (response) {
        vm.news = response.data;
      })
    }

    function getEmployeesNewsList() {
      newsApi.getEmployeeList().then(function (response) {
        response.data.data = response.data.data.filter(function (article) {
          return article.permission === vm.permission.EMPLOYEE;
        });

        vm.news = response.data;
      })
    }

    function getPagesList() {
      pagesApi.getList().then(function (response) {
        vm.pages = response.data;
      });
    }

    function init() {
      if($state.includes(vm.INDEX_TAB) || $state.includes(vm.NEWS_TAB))
        getNewsList();

      if($state.includes(vm.EMPLOYEES_TAB))
        getEmployeesNewsList();

      if($state.includes(vm.PAGES_TAB))
         getPagesList();

      if($state.includes(vm.ARTICLES_TAB))
         getArticlesList();

      vm.tab = $state.current.name;
    }
  });

//# sourceMappingURL=CmsCtrl.js.map
