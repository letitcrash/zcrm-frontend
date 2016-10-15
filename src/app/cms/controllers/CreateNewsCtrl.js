'use strict';

angular
  .module('inspinia')
  .controller('CreateNewsCtrl', function ($scope, $state, dataService, newsApi, uploadImage, cmsPermissions, summernoteConfig) {
    var vm = this;

    cmsPermissions.call(vm);
    uploadImage.call(vm);

    vm.NEW = true;

    init();

    vm.create = function () {
      var text = vm.article.getTextWithTemplateUrls();

      var article = {
        title: vm.article.title.substring(0,255),
        date: new Date().getTime(),
        author: dataService.getUser().contactProfile.id,
        permission: vm.getPermissions(),
        description: text.split("<hr>")[0].substring(0, 255),
        companyId: dataService.getCurrentCompanyId(),
        text: text,
        image: vm.article.image
      };

      newsApi.post(article).then(goBack);
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
