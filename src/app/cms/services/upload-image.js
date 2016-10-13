'use strict';

angular
  .module("inspinia")
  .factory("uploadImage", function (imagesApi, configurationService) {
    return function () {

      var uploadImage = this;

      uploadImage.createForm = {};
      uploadImage.baseStaticApiUrl = configurationService.staticBaseUrl;

      uploadImage.watch = function(scope) {
        scope.$watch(angular.bind(uploadImage, function () {
          return uploadImage.createForm.text;
        }), function (changedTextValue) {
          if(!changedTextValue)
            return;

          uploadImage.createForm.text = changedTextValue.replace("{{baseStaticApiUrl}}", uploadImage.baseStaticApiUrl)
        });
      };

      uploadImage.uploadTitleImage = function (attachedImage) {
        if (!attachedImage)
          return;

        uploadImage.attachedImage = attachedImage;
        imagesApi.upload(attachedImage).then(function (response) {
          uploadImage.createForm.image = response.data.path;
        });
      };

      uploadImage.uploadEditorImage = function (image) {
        image = image[0];

        imagesApi.upload(image).then(function (response) {
          uploadImage.createForm.text += '<img src="' +
            "{{baseStaticApiUrl}}" +
            response.data.path +
            '" alt="' +
            image.name +
            '">';
        });
      };

      uploadImage.dropImageButtonClick = function () {
        uploadImage.attachedImage = null;
        uploadImage.createForm.image = null;
      };
    }
  });
