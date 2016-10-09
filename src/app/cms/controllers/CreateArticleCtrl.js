'use strict';

angular
  .module('inspinia')
  .controller('CreateArticleCtrl', function ($state, dataService, articlesApi, uploadImage, cmsPermissions, summernoteConfig) {
    var vm = this;

    cmsPermissions.call(vm);
    uploadImage.call(vm);

    vm.NEW = true;

    init();

    vm.create = function () {
      var article = {
        companyId: dataService.getCurrentCompanyId(),
        title: vm.article.title.substring(0,255),
        date: new Date().getTime(),
        author: dataService.getUser().contactProfile.id,
        permission: vm.getPermissions(),
        tags: vm.article.tags,
        body: vm.article.text ? vm.article.text : '',
        image: vm.article.image
      };

      articlesApi.post(article).then(goBack);
    };

    vm.cancel = goBack;

    function init() {
      vm.summernote = summernoteConfig;
      vm.article = vm.createForm;
    }

    function goBack() {
      $state.go('index.cmsArticles');
    }
  });

//# sourceMappingURL=CreateArticleCtrl.js.map
