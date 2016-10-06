'use strict';

angular
  .module('inspinia')
  .controller('CreateNewsCtrl', function ($state, dataService, newsApi, uploadImage, cmsPermissions, summernoteConfig) {
    var vm = this;

    cmsPermissions.call(vm);
    uploadImage.call(vm);

    vm.NEW = true;

    init();

    vm.create = function () {
      if (!vm.article.text)
        vm.article.text = '';

      vm.article.title = vm.article.title.substring(0,255);
      vm.article.date = new Date().getTime();
      vm.article.author = dataService.getUser().contactProfile.id;
      vm.article.permission = vm.getPermissions();
      vm.article.description = vm.article.text.split("<hr>")[0].substring(0, 255);

      if (!vm.article.description)
        vm.article.description = '';

      vm.article.companyId = dataService.getCurrentCompanyId();

      newsApi.post(vm.article).then(goBack);
    };

    vm.cancel = goBack;

    function init() {
      vm.summernote = summernoteConfig;
      vm.article = vm.createForm;
    }

    function goBack() {
      $state.go('index.cmsNews');
    }
  });

//# sourceMappingURL=CreateNewsCtrl.js.map
