'use strict';

angular
  .module('inspinia')
  .controller('EditNewsCtrl', function ($state, newsApi, uploadImage, cmsPermissions, tinymceConfig, datepicker) {
    var vm = this;

    cmsPermissions.call(vm);
    uploadImage.call(vm);
    datepicker.call(vm);

    vm.UPDATE = true;

    init();

    vm.submit = function () {
      vm.article.textToTemplateUrls();
      vm.article.permission = vm.getPermissions();
      vm.article.creationTime = vm.datepicker.inputDate;

      newsApi.put(vm.article).then(goBack);
    };

    vm.delete = function () {
      newsApi.deleteNews(vm.article.id).then(goBack);
    };

    vm.cancel = goBack;

    function init() {
      vm.articleId = $state.params.articleId;
      vm.article = vm.createForm;
      vm.tinymceOptions = tinymceConfig.get(vm.article);

      getNewsArticle(vm.articleId);
    }

    function getNewsArticle(id) {
      newsApi.get(id).then(function (response) {
        angular.merge(vm.article, response.data);
        vm.article.textToLocalUrls();
        vm.setPermissions(vm.article.permission);
      });
    }

    function goBack() {
      $state.go('index.cmsNews');
    }
  });

//# sourceMappingURL=EditNewsCtrl.js.map
