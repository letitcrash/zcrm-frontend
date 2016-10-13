'use strict'

angular
  .module("inspinia")
  .factory("uploadImage", function (imagesApi) {
    return function () {

      var uploadImage = this;

      uploadImage.createForm = {};

      uploadImage.uploadImage = function (attachedImage) {
        attachedImage = attachedImage[0];
        if (!attachedImage)
          return;

        uploadImage.attachedImage = attachedImage;
        imagesApi.upload(attachedImage).then(function (response) {
          uploadImage.createForm.image = response.data.path;
        });
      };

      uploadImage.dropImageButtonClick = function () {
        uploadImage.attachedImage = null;
        uploadImage.createForm.image = null;
      }
    }
  });
