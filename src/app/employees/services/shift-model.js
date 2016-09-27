'use strict';

angular
  .module('inspinia')
  .factory('shiftModel', function () {
    function Shift() {
      this.id = 0;
      this.name = '';
    }

    return {
      get: function() { return new Shift(); }
    }
  });
