'use strict';

angular
  .module('inspinia')
  .factory('positionModel', function () {
    function Position() {
      this.id = 0;
      this.name = '';
    }

    return {
      get: function() { return new Position(); }
    }
  });
