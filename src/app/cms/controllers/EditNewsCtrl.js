'use strict';

angular
  .module('inspinia')
  .controller('EditNewsCtrl', function ($scope, $state, newsApi, uploadImage, cmsPermissions) {
    var vm = this;

    cmsPermissions.call(vm);
    uploadImage.call(vm);

    vm.UPDATE = true;

    init();

    vm.update = function () {
      var updateRequest = {
        title: vm.article.title,
        desc: vm.article.description,
        text: vm.article.getTextWithTemplateUrls(),
        tags: vm.article.tags,
        image: vm.article.image
        //permission: vm.getPermissions()
      };

      newsApi.put(vm.article.id, updateRequest).then(goBack);
    };

    vm.delete = function () {
      newsApi.deleteNews(vm.article.id).then(goBack);
    };

    vm.cancel = goBack;

    function init() {
      vm.articleId = $state.params.articleId;
      vm.article = vm.createForm;

      getNewsArticle(vm.articleId);
    }

    function getNewsArticle(id) {
      newsApi.get(id).then(function (response) {
        Object.assign(vm.article, response.data);
        vm.article.text = vm.article.getTextWithLocalUrls();
        vm.setPermissions(vm.article.permission);
      });
    }

    function goBack() {
      $state.go('index.cmsNews');
    }
  });

//# sourceMappingURL=EditNewsCtrl.js.map
