'use strict';

angular
  .module('inspinia')
  .controller('CmsPageEditCtrl', function ($state, $log, pagesApi) {
    var vm = this;

    vm.getPage = function () {
      pagesApi.get(vm.page.id).then(function (response) {
        vm.page = response.data;
      });
    };

    vm.update = function () {
      if (!vm.page.desc)
        return '';

      pagesApi.put(vm.page).then(function (response) {
        $state.go('index.cms');
      });
    };

    vm.createPage = function () {
      if (!vm.page.desc)
        return '';

      vm.page.date = new Date();

      pagesApi.post(vm.page).then(function () {
        $state.go('index.cms');
      });
    };

    var init = function () {
      vm.page = {
        id: $state.params.pageId
      };

      vm.getPage(vm.page.id);
    }

    init();
  });
