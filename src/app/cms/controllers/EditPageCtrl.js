'use strict';

angular
  .module('inspinia')
  .controller('EditPageCtrl', function ($state, $log, pagesApi, uploadImage, cmsPermissions) {
    var vm = this;

    cmsPermissions.call(vm);
    uploadImage.call(vm);

    vm.UPDATE = true;

    init();

    vm.update = function () {
      var request = {
        id: vm.page.id,
        image: vm.page.image,
        alias: vm.page.title,
        title: vm.page.title,
        desc: vm.page.description.substring(0, 255),
        body: vm.page.text,
        permission: vm.getPermissions()
      };

      pagesApi.put(request).then(goBack);
    };

    vm.delete = function () {
      pagesApi.deletePage(vm.page.id).then(goBack);
    };

    vm.cancel = goBack;

    function init() {
      vm.page = vm.createForm;
      vm.createForm.text = vm.page.body;
      vm.page.id = $state.params.pageId;

      getPage(vm.page.id);
    }

    function getPage() {
      pagesApi.get(vm.page.id).then(function (response) {
        Object.assign(vm.page, response.data);
        vm.page.text = vm.page.body;
        vm.setPermissions(vm.page.permission);
      });
    }

    function goBack() {
      $state.go('index.cmsPages');
    }
  });

//# sourceMappingURL=EditPageCtrl.js.map
