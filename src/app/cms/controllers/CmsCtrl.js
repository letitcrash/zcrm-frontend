'use strict';

angular
  .module('inspinia')
  .controller('CmsCtrl', function ($state, generalUtils, newsApi, pagesApi) {
    var vm = this;

    vm.NEWS_TAB = 1;
    vm.PAGES_TAB = 2;

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

    vm.setTab = function (newTab) {
      vm.tab = newTab;
    };

    vm.isSet = function (tabNum) {
      return vm.tab === tabNum;
    };

    function init() {
      vm.tab = vm.NEWS_TAB;

      getNewsList();
      getPagesList();
    }

    function getNewsList() {
      newsApi.getList().then(function (response) {
        vm.news = response.data;
      })
    }

    function getPagesList() {
      pagesApi.getList().then(function (response) {
        vm.pages = response.data;
      });
    }
  });

//# sourceMappingURL=CmsCtrl.js.map
