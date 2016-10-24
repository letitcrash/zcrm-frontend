'use strict';

angular
  .module('inspinia')
  .controller('CreateNewsCtrl', function ($scope, $state, dataService, newsApi, uploadImage, cmsPermissions, summernoteConfig, datepicker) {
    var vm = this;

    cmsPermissions.call(vm);
    uploadImage.call(vm);
    datepicker.call(vm);

    init();

    vm.submit = function () {
      vm.article.textToTemplateUrls();

      var article = {
        title: vm.article.title.substring(0,255),
        author: {
          id: dataService.getUserId(),
          username: '',
          userLevel: -1
        },
        permission: vm.getPermissions(),
        description: vm.article.text.split("<hr>")[0].substring(0, 255),
        companyId: dataService.getCurrentCompanyId(),
        text: vm.article.text,
        image: vm.article.image,
        creationTime: vm.datepicker.inputDate
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
