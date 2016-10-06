'use strict';

angular
  .module('inspinia')
  .controller('EditArticleCtrl', function ($state, articlesApi, uploadImage, cmsPermissions, configurationService) {
    var vm = this;

    cmsPermissions.call(vm);
    uploadImage.call(vm);

    vm.UPDATE = true;

    init();

    vm.update = function () {
      var updateRequest = {
        id: vm.article.id,
        title: vm.article.title,
        desc: vm.article.description,
        text: vm.article.text,
        tags: vm.article.tags,
        image: vm.article.image,
        permission: vm.getPermissions()
      };

      articlesApi.put(updateRequest).then(goBack);
    };

    vm.delete = function () {
      articlesApi.deleteArticle(vm.article.id).then(goBack);
    };

    vm.cancel = goBack;

    function init() {
      vm.articleId = $state.params.articleId;
      vm.article = vm.createForm;
      vm.baseServiceUrl = configurationService.staticBaseUrl;

      getNewsArticle(vm.articleId);
    }

    function getNewsArticle(id) {
      articlesApi.get(id).then(function (response) {
        Object.assign(vm.article, response.data);
        vm.setPermissions(vm.article.permission);
      });
    }

    function goBack() {
      $state.go('index.cmsArticles');
    }
  });

//# sourceMappingURL=EditNewsCtrl.js.map
