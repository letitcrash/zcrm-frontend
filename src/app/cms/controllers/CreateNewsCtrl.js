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
      var text = vm.article.getTextWithTemplateUrls();

      var article = {
        title: vm.article.title.substring(0,255),
        author: {
          id: dataService.getUserId(),
          username: '',
          userLevel: -1
        },
        permission: vm.getPermissions(),
        description: text.split("<hr>")[0].substring(0, 255),
        companyId: dataService.getCurrentCompanyId(),
        text: text,
        image: vm.article.image,
        publicationTime: vm.datepicker.input
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
