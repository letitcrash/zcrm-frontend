'use strict';

angular
  .module('inspinia')
  .controller('EditPageCtrl', function ($scope, $state, $log, pagesApi, uploadImage, cmsPermissions, datepicker) {
    var vm = this;

    cmsPermissions.call(vm);
    uploadImage.call(vm);
    datepicker.call(vm);

    init();

    vm.submit = function () {
      vm.page.textToTemplateUrls();
      vm.page.body = vm.page.text;
      vm.page.permission = vm.getPermissions();
      vm.page.creationTime = vm.datepicker.inputDate;

      pagesApi.put(vm.page).then(goBack);
    };

    vm.delete = function () {
      pagesApi.delete(vm.page.id).then(goBack);
    };

    vm.cancel = goBack;

    function init() {
      vm.page = vm.createForm;
      vm.page.id = $state.params.pageId;

      getPage(vm.page.id);
    }

    function getPage() {
      pagesApi.get(vm.page.id).then(function (response) {
        angular.merge(vm.page, response.data);
        vm.page.text = vm.page.body;
        vm.page.textToLocalUrls();
        vm.setPermissions(vm.page.permission);
      });
    }

    function goBack() {
      $state.go('index.cmsPages');
    }
  });

//# sourceMappingURL=EditPageCtrl.js.map
