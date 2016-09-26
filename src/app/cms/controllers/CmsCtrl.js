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
        articleId: page.id
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

    vm.createPage = function (addPage) {
      vm.addPage.date = new Date().getTime();
      vm.addPage.author = vm.user.contactProfile.id;
      vm.addPage.permission = 99;
      vm.addPage.companyId = vm.currentCompanyId;
      vm.addPage.description = vm.addPage.text.split("<hr>").first();

      pagesApi.post(addPage).then(function (response) {
        vm.page.push(response);
        vm.userFormStep = undefined;
      }, function () {
        vm.useralert = "News could not be created";
      })
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

      vm.addNews = {};
      vm.tab = vm.NEWS_TAB;
      vm.currentCompanyId = dataService.getCurrentCompanyId();
      vm.user = dataService.getUser();
      getNewsList();
    }

    function getNewsList() {
      newsApi.getList().then(function (response) {
        vm.news = response.data;
        vm.totalItems = response.totalSize;
      })
    }
  });

//# sourceMappingURL=CmsCtrl.js.map
