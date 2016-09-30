'use strict';

angular
  .module('inspinia')
  .controller('CmsCtrl', function ($state, generalUtils, newsApi, pagesApi) {
    var vm = this;

    vm.NEWS_TAB = "index.cmsNews";
    vm.PAGES_TAB = "index.cmsPages";

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

    function initTab() {
      if($state.includes("index.cms"))
        return(vm.tab = vm.NEWS_TAB);

      vm.tab = $state.current.name;
    }
  });

//# sourceMappingURL=CmsCtrl.js.map
