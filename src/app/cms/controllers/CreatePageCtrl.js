'use strict';

angular
  .module('inspinia')
  .controller('CreatePageCtrl', function ($state, pagesApi, uploadImage, dataService, cmsPermissions, summernoteConfig) {
    var vm = this;

    cmsPermissions.call(vm);
    uploadImage.call(vm);

    vm.NEW = true;

    init();

    vm.create = function () {
      var request = {
        companyId: dataService.getCurrentCompanyId(),
        alias: vm.page.title,
        title: vm.page.title.substring(0, 255),
        date: new Date().getTime(),
        author: dataService.getUser().contactProfile.id,
        description: vm.page.text.split("<hr>")[0].substring(0,255),
        image: vm.page.image,
        body: vm.page.text,
        permission: vm.getPermissions()
      };

      if (!request.description)
        request.description = '';

      pagesApi.post(request).then(goBack);
    };

    vm.cancel = goBack;

    function goBack() {
      $state.go('index.cmsPages');
    }

    function init() {
      vm.page = vm.createForm;
      vm.summernote = summernoteConfig;
    }
  });
