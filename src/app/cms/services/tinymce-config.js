'use strict';

angular
  .module('inspinia')
  .factory("tinymceConfig",(function () {
    function TinymceOptions (ctrlScope) {
      this.inline = false;
      this.selector = 'textarea';
      this.automatic_uploads = true;
      this.plugins  = 'media table advlist autolink link image lists charmap print preview fullscreen textcolor ' +
                      'wordcount';
      this.toolbar = 'undo redo | styleselect | bold italic underline | alignleft aligncenter alignright ' +
                     'alignjustify | bullist numlist outdent indent | link image media | forecolor backcolor | ' +
                     'preview';
      this.table_toolbar = false;
      this.file_browser_callback = function(field_name, url, type, win) {
        if(type=='image') {
          win.$('#editorImage').click();
        }
      };
      this.images_upload_handler = function (blobInfo, success, failure) {
        function blobToFile(theBlob, fileName) {
          theBlob.lastModifiedDate = new Date();
          theBlob.name = fileName;
          return theBlob;
        }
        var image = blobToFile(blobInfo.blob(), blobInfo.filename());
        ctrlScope.uploadEditorImage(image);
      };
      this.setup = function(editor) {
        editor.on('input', function(e) {
          editor.uploadImages()
        });
        editor.addButton('mybutton', {
          type: 'input',
          title: 'Insert image',
          icon: 'image',
          id: 'mybutton'
        })
      };
      this.skin = 'lightgray';
      this.theme = 'modern';
    }

    return {
      get: function (ctrlScope) {
        return new TinymceOptions(ctrlScope); }
    }

  }));