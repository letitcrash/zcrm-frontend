'use strict'

angular
  .module("inspinia")
  .factory("cmsPermissions", function () {
    return function () {
      var permissions;

      this.permission = Object.freeze({
        EMPLOYEE: 99,
        PUBLIC: 100
      });

      this.setPermissions = function (perm) {
        permissions = perm;
      };

      this.getPermissions = function() {
        if(!permissions)
          this.setPermissions(this.permission.EMPLOYEE);

        return permissions;
      };

      this.isSetPermissions = function (perm) {
        return permissions === perm;
      };
    }
  });
