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

    function init() {
      vm.tab = $state.current.name;
    }
  });

//# sourceMappingURL=CmsCtrl.js.map
