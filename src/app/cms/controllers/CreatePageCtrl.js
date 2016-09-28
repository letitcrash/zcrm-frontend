'use strict';

angular
  .module('inspinia')
  .controller('CreatePageCtrl', function ($state, pagesApi, imagesApi, dataService, summernoteConfig) {
    var vm = this;
    vm.NEW = true;

    init();

    vm.create = function () {
      var request = {
        companyId: dataService.getCurrentCompanyId(),
        alias: vm.page.title,
        title: vm.page.title,
        date: new Date().getTime(),
        author: dataService.getUser().contactProfile.id,
        description: vm.page.text.split("<hr>")[0],
        image: vm.page.image,
        body: vm.page.text,
        permission: 99
      };

      if (!request.description)
        request.description = '';

      pagesApi.post(request).then(function () {
        $state.go('index.cms')
      });
    };

    vm.uploadImage = function (attachedImage) {
      if (!attachedImage)
        return;

      vm.attachedImage = attachedImage;
      imagesApi.upload(attachedImage).then(function (response) {
        vm.page.image = response.data.path;
      });
    };

    vm.dropImageButtonClick = function () {
      vm.attachedImage = null;
      vm.page.image = null;
    };

    function init() {
      vm.createForm = {};
      vm.page = vm.createForm;
      vm.summernote = summernoteConfig;
    }
  });
