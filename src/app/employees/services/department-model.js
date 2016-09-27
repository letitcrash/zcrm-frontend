'use strict';

angular
  .module('inspinia')
  .factory('departmentModel', function () {
    function Department() {
      this.id = 0;
      this.name = '';
    }

    return {
      get: function() { return new Department(); }
    }
  });
