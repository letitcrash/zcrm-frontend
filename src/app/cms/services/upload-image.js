'use strict';

angular
  .module("inspinia")
  .factory("uploadImage", function (imagesApi, configurationService) {
    return function () {

      var baseStaticApiUrlTemplate = "{{baseStaticApiUrl}}";
      var uploadImage = this;

      uploadImage.createForm = {
        getTextWithLocalUrls: function () {
          if(!uploadImage.createForm.text)
            return "";

          return uploadImage.createForm.text.replace(baseStaticApiUrlTemplate, uploadImage.baseStaticApiUrl);
        },

        getTextWithTemplateUrls: function () {
          if(!uploadImage.createForm.text)
            return "";

          return uploadImage.createForm.text.replace(uploadImage.baseStaticApiUrl, baseStaticApiUrlTemplate)
        }
      };

      uploadImage.editor = {};
      uploadImage.baseStaticApiUrl = configurationService.staticBaseUrl;

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
          var url =  uploadImage.baseStaticApiUrl + response.data.path;
          uploadImage.editor.summernote('editor.insertImage', url);
        });
      };

      uploadImage.dropImageButtonClick = function () {
        uploadImage.attachedImage = null;
        uploadImage.createForm.image = null;
      };
    }
  });
