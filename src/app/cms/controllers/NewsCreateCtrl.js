'use strict';

angular
  .module('inspinia')
  .controller('NewsCreateCtrl', function ($state, $log, dataService, generalUtils, newsApi, imagesApi) {
    var vm = this;
    init()

    vm.convertToDate = generalUtils.formatTimestampToDate;

    vm.uploadImage = function (attachedImage) {
      if (!attachedImage)
        return;

      vm.attachedImage = attachedImage;
      imagesApi.upload(attachedImage).then(function (response) {
        $log.log(response);
        vm.article.image = response.data;

        vm.article = {
          image: response.data
        };
      });
    };

    vm.dropImageButtonClick = function () {
      vm.attachedImage = null;
      vm.article.image = null;
    };

    vm.create = function () {
      if (!vm.article.text)
        vm.article.text = '';

      vm.article.date = new Date().getTime();
      vm.article.author = vm.user.contactProfile.id;
      vm.article.permission = 99;
      vm.article.description = vm.article.text.split("<hr>")[0];
      vm.article.image = vm.article.image;

      if (!vm.article.description)
        vm.article.description = '';

      vm.article.companyId = dataService.getCurrentCompanyId();

      newsApi.post(vm.article).then(function () {
        vm.userFormStep = undefined;
        $state.go('index.cms');
      });
    };

    vm.summernote = {
      height: 300,
      focus: true,
      toolbar: [
        ['edit', ['undo', 'redo']],
        ['headline', ['style']],
        ['style', ['bold', 'italic', 'underline']],
        ['fontclr', ['color']],
        ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
        ['height', ['height']],
        ['table', ['table']],
        ['insert', ['picture', 'hr']]
      ]
    };

    function init() {
      vm.article = {};
      vm.tab = 1;
      vm.searchTerm = "";
      vm.currentCompanyId = dataService.getCurrentCompanyId();
      vm.user = dataService.getUser();
    }
  });

//# sourceMappingURL=NewsCreateCtrl.js.map
