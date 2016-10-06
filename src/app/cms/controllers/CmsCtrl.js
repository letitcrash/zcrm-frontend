'use strict';

angular
  .module('inspinia')
  .controller('CmsCtrl', function ($state, generalUtils, newsApi, pagesApi, cmsPermissions) {
    var vm = this;
    cmsPermissions.call(vm);

    vm.INDEX_CMS = "index.cms";
    vm.NEWS_TAB = "index.cmsNews";
    vm.PAGES_TAB = "index.cmsPages";
    vm.EMPLOYEES_TAB = "index.cmsEmployees";

    init();

    vm.convertToDate = generalUtils.formatTimestampToDate;

    vm.editArticle = function (article) {
      $state.go('index.editnews', {
        articleId: article.id
      });
    };

    vm.editPage = function (page) {
      $state.go('index.editpage', {
        pageId: page.id
      });
    };

    vm.isSet = function (tabNum) {
      return vm.tab === tabNum;
    };

    function init() {
      initTab();
      getPagesList();
    }

    function getNewsList() {
      newsApi.getList().then(function (response) {
        vm.news = response.data;
      })
    }

    function getEmployeesNewsList() {
      newsApi.getList().then(function (response) {
        vm.news = response.data.filter(function (article) {
          return article.permission === vm.permission.EMPLOYEE;
        });
      })
    }

    function getPagesList() {
      pagesApi.getList().then(function (response) {
        vm.pages = response.data;
      });
    }

    function initTab() {
      if($state.includes(vm.INDEX_CMS) || $state.includes(vm.NEWS_TAB)) {
        vm.tab = vm.NEWS_TAB;
        return getNewsList();
      }

      if($state.includes(vm.EMPLOYEES_TAB)) {
        vm.tab = vm.EMPLOYEES_TAB;
        return getEmployeesNewsList();
      }

      if($state.includes(vm.PAGES_TAB)) {
        vm.tab = vm.PAGES_TAB;
        return getPagesList();
      }

      vm.tab = $state.current.name;
    }
  });

//# sourceMappingURL=CmsCtrl.js.map
