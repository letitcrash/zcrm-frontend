'use strict';
angular.module('inspinia').factory('roleService', function(dataService) {
  var employeeAdmin, employeeDefault, employeeManager, systemAdmin, systemDefault, systemManager;
  systemAdmin = 99;
  systemManager = 999;
  systemDefault = 9999;
  employeeAdmin = 99;
  employeeManager = 999;
  employeeDefault = 9999;
  return {
    isSystemAdmin: function() {
      return dataService.getUserLevel() <= systemAdmin;
    },
    isSystemManager: function() {
      return dataService.getUserLevel() <= systemManager;
    },
    isEmployeeManager: function() {
      return dataService.getCurrentEmployeeLevel() <= employeeManager;
    },
    isManager: function() {
      return this.isSystemManager() || this.isEmployeeManager();
    }
  };
});

//# sourceMappingURL=roleService.js.map
