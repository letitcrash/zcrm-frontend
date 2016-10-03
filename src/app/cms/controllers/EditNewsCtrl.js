'use strict';

angular
  .module('inspinia')
  .controller('EditNewsCtrl', function ($state, newsApi, imagesApi, configurationService) {
    var vm = this;
    vm.UPDATE = true;

    init();

    vm.update = function () {
      newsApi.put(vm.article).then(function () {
        $state.go('index.cmsNews');
      });
    };

    vm.delete = function () {
      newsApi.deleteNews(vm.article.id).then(function () {
        $state.go('index.cmsNews');
      })
    };

    vm.uploadImage = function (attachedImage) {
      if (!attachedImage)
        return;

      vm.attachedImage = attachedImage;
      imagesApi.upload(attachedImage).then(function (response) {
        vm.article.image = response.data.path;
      });
    };

    vm.dropImageButtonClick = function () {
      vm.attachedImage = null;
      vm.article.image = null;
    };

    vm.cancel = function () {
      $state.go('index.cmsNews');
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
