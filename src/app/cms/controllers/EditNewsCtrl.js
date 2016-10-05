'use strict';

angular
  .module('inspinia')
  .controller('EditNewsCtrl', function ($state, newsApi, imagesApi, cmsPermissions, configurationService) {
    cmsPermissions.call(this);

    var vm = this;
    vm.UPDATE = true;

    init();

    vm.update = function () {
      newsApi.put(vm.article).then($state.go('index.cmsNews'));
    };

    vm.delete = function () {
      newsApi.deleteNews(vm.article.id).then($state.go('index.cmsNews'));
    };

    vm.uploadImage = function (attachedImage) {
      if (!attachedImage)
        return;

      vm.attachedImage = attachedImage;
      imagesApi.upload(attachedImage).then(function (response) {
        vm.article.image = response.data.path;
      });
    };

    vm.cancel = function () {
      $state.go('index.cmsNews');
    };

    vm.dropImageButtonClick = function () {
      vm.attachedImage = null;
      vm.article.image = null;
    };

    function init() {
      vm.articleId = $state.params.articleId;
      vm.createForm = {};
      vm.article = vm.createForm;
      vm.baseServiceUrl = configurationService.staticBaseUrl;

      getNewsArticle(vm.articleId);
    }

    function getNewsArticle(id) {
      newsApi.get(id).then(function (response) {
        Object.assign(vm.article, response.data);
      });
    }
  });

//# sourceMappingURL=EditNewsCtrl.js.map
