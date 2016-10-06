'use strict';

angular
  .module('inspinia')
  .controller('EditPageCtrl', function ($state, $log, pagesApi, imagesApi, cmsPermissions, configurationService) {
    var vm = this;
    cmsPermissions.call(vm);
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

      pagesApi.put(request).then($state.go('index.cmsPages'));
    };

    vm.delete = function () {
      pagesApi.deletePage(vm.page.id).then($state.go('index.cmsPages'));
    };

    vm.uploadImage = function (attachedImage) {
      if (!attachedImage)
        return;

      vm.attachedImage = attachedImage;
      imagesApi.upload(attachedImage).then(function (response) {
        vm.createForm.image = response.data.path;
      });
    };

    vm.dropImageButtonClick = function () {
      vm.attachedImage = null;
      vm.page.image = null;
    };

    vm.cancel = function () {
      $state.go('index.cmsPages');
    };

    function init() {
      vm.createForm = {};
      vm.page = vm.createForm;
      vm.createForm.text = vm.page.body;
      vm.page.id = $state.params.pageId;
      vm.baseServiceUrl = configurationService.staticBaseUrl;

      getPage(vm.page.id);
    }

    function getPage() {
      pagesApi.get(vm.page.id).then(function (response) {
        Object.assign(vm.page, response.data);
        vm.page.text = vm.page.body;
        vm.setPermissions(vm.page.permission);
      });
    }
  });
