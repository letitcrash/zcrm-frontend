'use strict';

angular
  .module('inspinia')
  .constant("summernoteConfig",(function () {
    var config = {
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
        ['insert', ['link', 'picture', 'hr']]
      ]
    };

    return Object.freeze(config);
  })());
