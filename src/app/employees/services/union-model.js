'use strict';

angular
  .module('inspinia')
  .factory('unionModel', function () {
    function Union() {
      this.id = 0;
      this.name = '';
      this.description = '';
    }

    return {
      get: function() { return new Union(); }
    }
  });
