'use strict';

angular
  .module('inspinia')
  .controller('CmsArticleEditCtrl', function ($state, $log, newsApi, imagesApi, configurationService) {
    var vm = this;

    vm.getNewsArticle = function (id) {
      newsApi.get(id).then(function (response) {
        vm.article = response.data;
      });
    };

    vm.update = function () {
      if (!vm.article.desc)
        vm.article.desc = '';

      newsApi.put(vm.article).then(function () {
        $state.go('index.cms');
      });
    };

    vm.uploadImage = function (attachedImage) {
      if (!attachedImage)
        return;

      vm.attachedImage = attachedImage;
      imagesApi.upload(attachedImage).then(function (response) {
        vm.article.image = response.data;
      });
    };

    vm.dropImageButtonClick = function () {
      vm.attachedImage = null;
      vm.article.image = null;
    };

    function init() {
      vm.articleId = $state.params.articleId;
      vm.baseServiceUrl = configurationService.staticBaseUrl;
      vm.getNewsArticle(vm.articleId);
    }

    init();
  });

//# sourceMappingURL=CmsArticleEditCtrl.js.map
