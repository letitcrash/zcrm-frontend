

'use strict';
angular.module('inspinia').controller("EmployeeCtrl", function($scope, $http, 
  requestService, employeeService, passwordServices, workplaceService
  , generalUtils, dataService, $q, $timeout, $uibModal, companyService) {
  var del, getEmployees, setEmpChange, setPasswordChange;
  

  $scope.add = function() {
    var emp;
    $scope.setSelected(void 0);
    $scope.setSelectedButton(0);
    emp = {};
    emp.user = {};
    emp.employmentNumber = {};
    emp.employeeLevel = 9999;
    emp.user.contactProfile = {};
    $scope.employees.unshift(emp);
    $scope.editId = void 0;
    $scope.selected = angular.copy(emp);
  };

  $scope.cancel = function() {
    console.log("Cancel");
    $scope.user = {};

  };


  $scope.setAlertMessage = function(success, message) {
    $scope.alertMessage = {};
    if (!success) {
      $scope.alertMessage.failed = message;
    }
  };

  $scope.save = function(emp) {
    console.log(emp)
    if ((emp.id != null)) {
      $scope.update(emp);
    } else {
      $scope.create(emp);
    }
  };
  
  $scope.changeUnion = function(union) {
    if(union) 
    employeeService.setEmployeeUnion($scope.currentEmp.id , union.id).then(function(response) {
      console.log("Employee union updated succesfully");
      console.log(response);
      $scope.currentEmp.union = union;
      var emp = $scope.employees.filter(function( obj ) {
        return obj.id == $scope.currentEmp.id;
      });

      console.log(emp);
      emp[0].union = union;
      //$scope.employees.push($scope.currentEmp);
      //$scope.currentEmp = response;
      $scope.editUnionAction = false;

    }, function(response) {
      console.log("Employee could not be created");
      $scope.useralert = "Employee could not be created";
    });
  };

  $scope.changeShift = function(shift) {
    if(shift) 
    employeeService.setEmployeeShift($scope.currentEmp.id , shift.id).then(function(response) {
      console.log("Employee shift updated succesfully");
      console.log(response);
      $scope.currentEmp.shift = shift;
      var emp = $scope.employees.filter(function( obj ) {
        return obj.id == $scope.currentEmp.id;
      });

      console.log(emp);
      emp[0].shift = shift;
      //$scope.employees.push($scope.currentEmp);
      //$scope.currentEmp = response;
      $scope.editShiftAction = false;

    }, function(response) {
      console.log("Employee could not be created");
      $scope.useralert = "Employee could not be created";
    });
  };


  $scope.changeDepartment = function(dept) {
    if(dept) 
    employeeService.setEmployeeDepartment($scope.currentEmp.id , dept.id).then(function(response) {
      console.log("Employee department updated succesfully");
      console.log(response);
      $scope.currentEmp.department = dept;
      var emp = $scope.employees.filter(function( obj ) {
        return obj.id == $scope.currentEmp.id;
      });

      console.log(emp);
      emp[0].department = dept;
      //$scope.employees.push($scope.currentEmp);
      //$scope.currentEmp = response;
      $scope.editDepartmentAction = false;

    }, function(response) {
      console.log("Employee could not be created");
      $scope.useralert = "Employee could not be created";
    });
  };

  $scope.changePosition = function(position) {
    if(position) 
    employeeService.setEmployeePosition($scope.currentEmp.id , position.id).then(function(response) {
      console.log("Employee position updated succesfully");
      console.log(response);
      $scope.currentEmp.position = position;
      var emp = $scope.employees.filter(function( obj ) {
        return obj.id == $scope.currentEmp.id;
      });

      console.log(emp);
      emp[0].position = position;
      //$scope.employees.push($scope.currentEmp);
      //$scope.currentEmp = response;
      $scope.editPositionAction = false;

    }, function(response) {
      console.log("Employee could not be created");
      $scope.useralert = "Employee could not be created";
    });
  };

  $scope.create = function(emp) {
    employeeService.create(emp).then(function(response) {
      console.log("Employee created succesfully");
      console.log(response);
      $scope.cancel();
      $scope.employees.push(response);
      $scope.userFormStep = undefined;
      $scope.currentEmp = angular.copy(response);
    }, function(response) {
      console.log("Employee could not be created");
      $scope.useralert = "Employee could not be created";
    });
  };

  $scope.update = function(emp) {
    console.log(emp);
    employeeService.updateProfile(emp.user.contactProfile).then(function(response) {
      console.log("Employee updated succesfully");
      setEmpChange(true, "Medarbetaren har uppdaterats.");
      $scope.cancel();
      console.log("response");
      $scope.currentEmp.user.contactProfile = response;
      var emp = $scope.employees.filter(function( obj ) {
        return obj.id == $scope.currentEmp.id;
      });

      console.log(emp);
      emp[0].user.contactProfile = response;
      $scope.editNameAction = false;
      $scope.editPhoneAction = false;
      $scope.editEmailAction = false;
      $scope.editAddressAction = false;

    }, function(response) {
      console.log("Employee could not be updated");
      setEmpChange(false, "Medarbetaren kunde inte ändras.");
    });
  };

  $scope.changePassword = function(id, pwd, confirmPwd) {
    if ((pwd != null) && (confirmPwd != null) && pwd === confirmPwd) {
      passwordServices.setPassword(id, pwd, '').then(function(response) {
        console.log("Password was set successfully");
        setPasswordChange(true, "Lösenordet har blivit satt.");
      }, function(response) {
        console.log("Password could not be set");
        setPasswordChange(false, "Ett fel uppstod, kunde inte sätta lösenordet.");
      });
    } else {
      setPasswordChange(false, "Lösenorden matchar inte.");
    }
  };

  del = function(id) {
    employeeService["delete"](id).then(function(response) {
      console.log("deleted");
      getEmployees(true);
    }, function(response) {
      console.log("not deleted");
      $scope.setEmpChange(false, "Medarbetaren kunde inte tas bort.");
    });
  };

  $scope.openConfirmDelete = function(emp) {
    var ModalInstanceCtrl, modalInstance;
    ModalInstanceCtrl = function($scope, $modalInstance) {
      $scope.title = "Varning!";
      $scope.text = "Vill du verkligen ta bort användaren '" + generalUtils.formatUser(emp.user) + "'";
      $scope.del = function() {
        $modalInstance.close(1);
      };
      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    };
    ModalInstanceCtrl.$inject = ['$scope', '$modalInstance'];
    modalInstance = $modal.open({
      templateUrl: 'components/partials/confirm-delete-dialog.html',
      controller: ModalInstanceCtrl,
      size: 'sm'
    });
    modalInstance.result.then(function(res) {
      del(emp.id);
    }, function() {
      console.log('Modal dismissed at: ' + new Date());
    });
  };

  setEmpChange = function(success, message) {
    $scope.empChange = {};
    if (success) {
      $scope.empChange.success = message;
    } else {
      $scope.empChange.failed = message;
    }
  };

  setPasswordChange = function(success, message) {
    $scope.passwordChange = {};
    if (success) {
      $scope.passwordChange.success = message;
    } else {
      $scope.passwordChange.failed = message;
    }
  };

  $scope.searchEmployees = function() {
    var DELAY_AMOUNT, DELAY_KEY;
    $scope.pageNr = 1;
    console.log("Search with searchTerm:" + $scope.searchTerm);
    DELAY_AMOUNT = 500;
    DELAY_KEY = "searchEmployeeDelay";
    generalUtils.delayFunction(DELAY_KEY, DELAY_AMOUNT).then(function() {
      getEmployees(true, $scope.pageSize, $scope.pageNr, $scope.searchTerm, $scope.filter);
    });
  };

  getEmployees = function(force, pageSize, pageNr, searchTerm, filter) {
    employeeService.getList(force, pageSize, pageNr, searchTerm, filter).then(function(response) {
      console.log("got employees");
      console.log(response);
      $scope.showLoadingMessage = false;
      $scope.employees = response.data;
      $scope.totalItems = response.totalCount;
    }, function(response) {
      console.log("Could not get employees");
    });
  };

  $scope.changePage = function() {
    getEmployees(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
  };
  
  $scope.openEmp = function(emp) {
      console.log(emp)
      $scope.mode = 1;
      $scope.currentEmp = angular.copy(emp);
  }


  $scope.createUserAction = function() {
      $scope.activeEmp = true;
      $scope.currentEmp = {};
      $scope.currentEmp.id = null;
      $scope.userFormStep = 1;
  };



  $scope.closeCurrentEmp = function() {
    $scope.activeEmp = false;
    $scope.editUser = false;

  };


  $scope.createUser = function(user) {
    $scope.activeEmp = false;

  };

  $scope.addUser = function() {
    $scope.activeEmp = true;
    $scope.currentEmp = {};
  }

  $scope.showEmployees = function() {
    $scope.activeEmp = false;
    $scope.currentEmp = {};
  }


  $scope.assignRoleAction = function(emp) {
      $scope.activeEmp = true;
      $scope.curentEmp = emp;
  }

  $scope.delegateRole = function(user) {
    employeeService.delegateRole(user, $scope.currentEmp.id).then(function(response) {
      console.log("role delegated");
      console.log(response);
      $scope.currentEmp.delegates.push(response);
      $scope.addingDelegate = false;
    }, function(response) {
      console.log("Could not delegate role");
      console.log(response);
    });
  }

  $scope.close = function(emp) {
  	$scope.activeEmp = false;
  	$scope.curentEmp = emp;
  }

  $scope.$watch('currentFilters.union', function(union) {
    console.log(union)
    var exists;
    if ((union != null) && !isNaN(union.id)) {
      exists = $scope.filter.unions[union.id] !== void 0;
      if (!exists) {
        $scope.filter.unions[union.id] = union;
        $scope.currentFilters.union = '';
      } else {
        console.log("Already added");
      }
      $scope.currentFilters.union = '';
      getEmployees(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm, $scope.filter);
    }
  });


  $scope.timeConverter = function(UNIX_timestamp){
    var dateTime = new Date( UNIX_timestamp );
    return dateTime.toDateString();;
  };

    
  $scope.init = function() {
    console.log("Running init in employeesController");

    $scope.unionFilterState = ''
    $scope.currentFilters = {};
    $scope.isCollapsed = false;
    $scope.showLoadingMessage = true;
    $scope.pageSize = 15;
    $scope.pageNr = 1;
    $scope.searchTerm = "";
  	$scope.activeEmp = false;
  	$scope.activeUsr = false;
    $scope.currentEmp = {};
    $scope.filter = {};
    $scope.filter.unions = [];
    $scope.filter.positions = {};
    $scope.filter.departments = {};
    $scope.filter.shifts = {};
    getEmployees(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm, $scope.filter);

    //TODO: Query is slow
    companyService.get(dataService.getCurrentCompanyId()).then(function(response) {
      console.log("Getting company");
      $scope.mycp = response; 
    }, function(response) {
      console.log("Failed to get company");
    });

  };

  $scope.init();
});

//# sourceMappingURL=employeesController.js.map
