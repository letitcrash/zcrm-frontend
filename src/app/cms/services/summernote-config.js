'use strict';

angular
  .module('inspinia')
  .constant("summernoteConfig",{
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
  });
