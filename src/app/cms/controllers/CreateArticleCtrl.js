'use strict';

angular
  .module('inspinia')
  .controller('CreateArticleCtrl', function ($state, dataService, articlesApi, uploadImage, cmsPermissions, tinymceConfig, datepicker) {
    var vm = this;

    cmsPermissions.call(vm);
    uploadImage.call(vm);
    datepicker.call(vm);

    init();

    vm.submit = function () {
      vm.article.textToTemplateUrls();
      var body = vm.article.text;

      var article = {
        companyId: dataService.getCurrentCompanyId(),
        title: vm.article.title.substring(0,255),
        author: {
          id: dataService.getUserId(),
          username: '',
          userLevel: -1
        },
        permission: vm.getPermissions(),
        tags: vm.article.tags,
        body: body,
        image: vm.article.image,
        creationTime: vm.datepicker.inputDate
      };

      articlesApi.post(article).then(goBack);
    };

    vm.cancel = goBack;

    function init() {
      vm.article = vm.createForm;
      vm.tinymceOptions = tinymceConfig.get(vm.article);
    }

    function goBack() {
      $state.go('index.cmsArticles');
    }
  });

//# sourceMappingURL=CreateArticleCtrl.js.map

