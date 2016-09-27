'use strict';

angular
  .module('inspinia')
  .controller('CmsPageEditCtrl', function ($state, $log, pagesApi) {
    var vm = this;

    vm.getPage = function () {
      pagesApi.get(vm.page.id).then(function (response) {
        Object.assign(vm.page, response.data);
      });
    };

    vm.update = function () {
      var request = {
        //image: vm.page.image
        alias: vm.page.title,
        title: vm.page.title,
        desc: vm.page.description,
        body: vm.page.body
      };

      pagesApi.put(vm.page.id, request).then(function () {
        $state.go('index.cms');
      });
    };

    var init = function () {
      vm.page = {
        id: $state.params.pageId
      };

      vm.getPage(vm.page.id);
    };

    init();
  });
