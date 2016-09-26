'use strict';

angular
  .module('inspinia')
  .controller('CmsPageEditCtrl', function ($state, $log, pagesApi) {
    var vm = this;
    init();

    vm.getPage = function (id) {
      pagesApi.get(id).then(function (response) {
        $log.log(response);
        vm.page = response.data;
        vm.totalItems = response.totalSize;
      });
    };

    vm.update = function (page) {
      pagesApi.put(page).then(function (response) {
        $log.log(response);
        $state.go('index.cms');
      });
    };

    function init() {
      vm.pageId = $state.params.pageId;
      $log.log("PageId " + vm.pageId);
      vm.get(vm.pageId);
    }
  });
