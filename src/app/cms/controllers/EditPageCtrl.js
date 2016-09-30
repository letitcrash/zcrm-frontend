'use strict';

angular
  .module('inspinia')
  .controller('EditPageCtrl', function ($state, $log, pagesApi, imagesApi, configurationService) {
    var vm = this;
    vm.UPDATE = true;

    init();

    vm.update = function () {
      var request = {
        image: vm.page.image,
        alias: vm.page.title,
        title: vm.page.title,
        desc: vm.page.description,
        body: vm.page.text
      };

      pagesApi.put(vm.page.id, request).then(function () {
        $state.go('index.cmsPages');
      });
    };

    vm.delete = function () {
      pagesApi.deletePage(vm.page.id).then(function () {
        $state.go('index.cmsPages');
      })
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
      });
    }
  });
