'use strict';

angular
  .module('inspinia')
  .controller('CreateNewsCtrl', function ($state, $log, dataService, generalUtils, newsApi, imagesApi, cmsPermissions, summernoteConfig) {
    cmsPermissions.call(this);

    var vm = this;
    vm.NEW = true;

    init();

    vm.uploadImage = function (attachedImage) {
      if (!attachedImage)
        return;

      vm.attachedImage = attachedImage;
      imagesApi.upload(attachedImage).then(function (response) {
        vm.article.image = response.data.path;
      });
    };

    vm.dropImageButtonClick = function () {
      vm.attachedImage = null;
      vm.article.image = null;
    };

    vm.create = function () {
      if (!vm.article.text)
        vm.article.text = '';

      vm.article.title = vm.article.title.substring(0,255);
      vm.article.date = new Date().getTime();
      vm.article.author = dataService.getUser().contactProfile.id;
      vm.article.permission = 99;
      vm.article.description = vm.article.text.split("<hr>")[0].substring(0, 254);

      if (!vm.article.description)
        vm.article.description = '';

      vm.article.companyId = dataService.getCurrentCompanyId();

      newsApi.post(vm.article).then($state.go('index.cmsNews'));
    };

    vm.cancel = function () {
      $state.go('index.cmsNews');
    };

    function init() {
      vm.createForm = {};
      vm.summernote = summernoteConfig;
      vm.article = vm.createForm;
    }
  });

//# sourceMappingURL=CreateNewsCtrl.js.map
