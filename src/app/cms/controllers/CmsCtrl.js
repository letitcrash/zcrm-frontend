'use strict';

angular
  .module('inspinia')
  .controller('CmsCtrl', function ($state, $log, dataService, generalUtils, newsApi, pagesApi) {
    var vm = this;
    var dateTime = new Date();

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

    vm.dateoptions = {
      dateDisabled: true,
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
    };

    vm.today = function () {
      return dateTime;
    };

    vm.clear = function () {
      dateTime = null;
    };

    vm.inlineOptions = {
      customClass: 'getDayClass',
      minDate: new Date(),
      showWeeks: true
    };

    vm.createPage = function () {
      var request = {
        companyId: vm.currentCompanyId,
        alias: vm.page.title,
        title: vm.page.title,
        date: new Date().getTime(),
        author: vm.user.contactProfile.id,
        description: vm.page.body.split("<hr>")[0],
        //image: vm.page.image,
        body: vm.page.body,
        permission: 99
      };

      if (!request.description)
        request.description = '';

      pagesApi.post(request).then(function () {
        $state.go('index.cms')
      });
    };

    vm.summernote = {
      height: 300,
      focus: true,
      toolbar: [
        ['edit', ['undo', 'redo']],
        ['headline', ['style']],
        ['style', ['bold', 'italic', 'underline']],
        ['fontclr', ['color']],
        ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
        ['height', ['height']],
        ['table', ['table']],
        ['insert', ['picture', 'hr']]
      ]
    };

    function init() {
      dateTime = new Date();
      vm.tab = vm.NEWS_TAB;
      vm.currentCompanyId = dataService.getCurrentCompanyId();
      vm.user = dataService.getUser();
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
