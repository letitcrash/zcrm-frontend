'use strict';

angular
  .module('inspinia')
  .controller('EditArticleCtrl', function ($scope, $state, articlesApi, uploadImage, cmsPermissions, datepicker) {
    var vm = this;

    cmsPermissions.call(vm);
    uploadImage.call(vm);
    datepicker.call(vm);

    init();

    vm.submit = function () {
      var body = vm.article.getTextWithTemplateUrls();

      var article = {
        title: vm.article.title,
        body: body,
        tags: vm.article.tags,
        image: vm.article.image,
        publicationTime: vm.datepicker.input
        //permission: vm.getPermissions()
      };

      articlesApi.put(vm.article.id, article).then(goBack);
    };

    vm.delete = function () {
      articlesApi.deleteArticle(vm.article.id).then(goBack);
    };

    vm.cancel = goBack;

    function init() {
      vm.articleId = $state.params.articleId;
      vm.article = vm.createForm;

      getNewsArticle(vm.articleId);
    }

    function getNewsArticle(id) {
      articlesApi.get(id).then(function (response) {
        Object.assign(vm.article, response.data);
        vm.article.text = vm.article.body;
        vm.article.text = vm.article.getTextWithLocalUrls();
        vm.setPermissions(vm.article.permission);
      });
    }

    function goBack() {
      $state.go('index.cmsArticles');
    }
  });

//# sourceMappingURL=EditNewsCtrl.js.map
