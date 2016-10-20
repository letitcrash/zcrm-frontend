'use strict';

angular
  .module('inspinia')
  .controller('EditArticleCtrl', function ($state, articlesApi, uploadImage, cmsPermissions, tinymceConfig, datepicker) {
    var vm = this;

    cmsPermissions.call(vm);
    uploadImage.call(vm);
    datepicker.call(vm);

    init();

    vm.submit = function () {
      vm.article.textToTemplateUrls();
      vm.article.body = vm.article.text;
      vm.article.permission = vm.getPermissions();
      vm.article.creationTime = vm.datepicker.inputDate;

      articlesApi.put(vm.article).then(goBack);
    };

    vm.delete = function () {
      articlesApi.deleteArticle(vm.article.id).then(goBack);
    };

    vm.cancel = goBack;

    function init() {
      vm.articleId = $state.params.articleId;
      vm.article = vm.createForm;
      vm.tinymceOptions = tinymceConfig.get(vm.article);

      getNewsArticle(vm.articleId);
    }

    function getNewsArticle(id) {
      articlesApi.get(id).then(function (response) {
        angular.merge(vm.article, response.data);
        vm.article.text = vm.article.body;
        vm.article.textToLocalUrls();
        vm.setPermissions(vm.article.permission);
      });
    }

    function goBack() {
      $state.go('index.cmsArticles');
    }
  });

//# sourceMappingURL=EditNewsCtrl.js.map
