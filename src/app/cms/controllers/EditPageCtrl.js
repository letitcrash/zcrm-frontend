'use strict';

angular
  .module('inspinia')
  .controller('EditPageCtrl', function ($scope, $state, $log, pagesApi, uploadImage, cmsPermissions) {
    var vm = this;

    cmsPermissions.call(vm);
    uploadImage.call(vm);

    vm.UPDATE = true;

    init();

    vm.update = function () {
      var page = {
        image: vm.page.image ? vm.page.image : "",
        alias: vm.page.title,
        title: vm.page.title.substring(0, 255),
        desc: vm.page.description.substring(0, 255),
        body: vm.page.getTextWithTemplateUrls(),
        //permission: vm.getPermissions()
      };

      pagesApi.put(vm.page.id, page).then(goBack);
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
        Object.assign(vm.page, response.data);
        vm.page.text = vm.page.body;
        vm.page.text = vm.page.getTextWithLocalUrls();
        vm.setPermissions(vm.page.permission);
      });
    }

    function goBack() {
      $state.go('index.cmsPages');
    }
  });

//# sourceMappingURL=EditPageCtrl.js.map
