

'use strict';
angular.module('inspinia').controller("EmployeeCtrl", function($scope, $rootScope, requestService, employeeService, passwordServices, workplaceService, periodService, generalUtils, dataService, $q, $timeout, $uibModal, companyService) {
  var del, getEmployees, getWorkplaces, setEmpChange, setPasswordChange, uglyGetTime;
  $scope.setSelected = function(id) {
    console.log("selecting " + id);
    $scope.empChange = {};
    $scope.passwordChange = {};
    $scope.getLatestPeriodByEmployeeId(id);
    $scope.selected = angular.copy(_.find($scope.employees, (function(e) {
      return e.id === id;
    })));
    return $scope.setSelectedButton(0);
  };



  $scope.setSelectedButton = function(i) {
    switch (i) {
      case 1:
        if (($scope.selected != null) && ($scope.selected.id != null)) {
          $scope.selected.fromDate = new Date();
          $scope.selected.fromDate.setHours(0, 0, 0, 0);
          $scope.selected.fromDate.setDate($scope.selected.fromDate.getDate() - 7);
          $scope.selected.untilDate = new Date();
          $scope.selected.untilDate.setHours(23, 59, 59, 999);
        }
        break;
      case 2:
        $scope.newPeriod = {
          startDate: new Date(),
          fromTime: 7 * 60 * 60 * 1000,
          untilTime: 16 * 60 * 60 * 1000,
          pauses: []
        };
        $scope.newPeriod.startDate.setHours(0, 0, 0, 0);
    }
    return $scope.selectedButton = i;
  };
  $scope.getLatestPeriodByEmployeeId = function(id) {
    if (id) {
      return periodService.getLatestPeriodByEmployeeId(id).then(function(response) {
        return $scope.latestPeriod = response;
      }, function(response) {
        return console.log("Failed to get the latest period");
      });
    }
  };
  $scope.addPeriod = function(newPeriod, start) {
    var today;
    console.log("start pppp");
    console.log(start);
    if (!$scope.newPeriods) {
      $scope.newPeriods = [];
    }
    if (start) {
      today = new Date;
      newPeriod.fromTime = today.getTime();
      newPeriod.startDate = today.getDate();
      newPeriod.untilTime = void 0;
      return newPeriod.started = true;
    } else {
      return $scope.newPeriods.push(angular.copy(newPeriod));
    }
  };
  $scope.addPeriodPause = function(index) {
    return $scope.newPeriods[index].pauses.push({});
  };
  $scope.cancelPeriod = function(index) {
    console.log("canceling:" + index);
    return $scope.newPeriods.splice(index, 1);
  };
  $scope.savePeriod = function(np) {
    var blipContinue, blipEnd, blipPause, blipStart, blips, fromTime, j, len, pause, pauses, period, startDate, untilTime, workplace;
    np.locked = true;
    workplace = np.workplace;
    startDate = np.startDate;
    fromTime = np.fromTime;
    untilTime = np.untilTime;
    pauses = np.pauses;
    startDate.setHours(0, 0, 0, 0);
    blips = [];
    blipStart = {
      typeOf: 1,
      timestamp: startDate.getTime() + uglyGetTime(fromTime)
    };
    blips.push(blipStart);
    for (j = 0, len = pauses.length; j < len; j++) {
      pause = pauses[j];
      if (!isNaN(pause.fromTime) && !isNaN(pause.untilTime)) {
        blipPause = {
          typeOf: 4,
          timestamp: startDate.getTime() + uglyGetTime(pause.fromTime)
        };
        blipContinue = {
          typeOf: 3,
          timestamp: startDate.getTime() + uglyGetTime(pause.untilTime)
        };
        blips.push(blipPause);
        blips.push(blipContinue);
      }
    }
    blipEnd = {
      typeOf: 2,
      timestamp: startDate.getTime() + uglyGetTime(untilTime)
    };
    blips.push(blipEnd);
    period = {
      workplaceId: workplace.id,
      blips: blips
    };
    console.log(period);
    return periodService.create($scope.selected.id, period).then(function(response) {
      console.log("successfull period post");
      return np.success = true;
    }, function(response) {
      console.log("failed period post");
      np.success = false;
      return np.locked = false;
    });
  };
  uglyGetTime = function(time) {
    return time + 1 * 60 * 60 * 1000;
  };
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
    return $scope.selected = angular.copy(emp);
  };
  $scope.setSubContractor = function() {
    if ($scope.isSubContractor) {
      return $scope.isSubContractor = false;
    } else {
      return $scope.isSubContractor = true;
    }
  };
  $scope.setEmploymentType = function(n) {
    if (n === "ID06") {
      $scope.employmentTypePlaceholder = "ID06";
      return $scope.selected.employmentNumberType = "ID06";
    } else if (n === "employee") {
      $scope.employmentTypePlaceholder = "Anställningsnummer";
      return $scope.selected.employmentNumberType = "employee";
    } else {
      $scope.employmentTypePlaceholder = "Personnummer";
      $scope.selected.employmentNumberType = "person";
      return console.log($scope.selected.employmentNumberType);
    }
  };
  $scope.cancelAdd = function() {
    return $scope.setSelected(void 0);
  };
  $scope.cancel = function() {
    console.log("Cancel");
    $scope.user = {};

  };
  $scope.edit = function(employee) {
    $scope.cancel();
    return $scope.editId = employee.id;
  };
  $scope.sendMessage = function(recipient, body) {
    return employeeService.postMessage([recipient], body).then(function(response) {
      var emp;
      console.log("Message sent successfully");
      emp = _.find($scope.employees, (function(e) {
        return e.id === $scope.selected.id;
      }));
      emp.message = '';
      return $scope.setSelectedButton(0);
    }, function(response) {
      console.log("Message could not be sent");
      return $scope.setAlertMessage(false, "Kunde inte skicka meddelande");
    });
  };
  $scope.setAlertMessage = function(success, message) {
    $scope.alertMessage = {};
    if (!success) {
      return $scope.alertMessage.failed = message;
    }
  };
  $scope.save = function(emp) {
    console.log(emp)
    if ((emp.id != null)) {
      return $scope.update(emp);
    } else {
      return $scope.create(emp);
    }
  };
  
  $scope.changeUnion = function(union) {
    console.log("sss")
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

  $scope.create = function(emp) {
    employeeService.create(emp).then(function(response) {
      console.log("Employee created succesfully");
      console.log(response);
      $scope.cancel();
      $scope.employees.push(response);
      //$uibModalInstance.dismiss('cancel');
      //$scope.setSelected(response.id);
      //setEmpChange(true, "Medarbetaren har skapats.");
      $scope.closeCurrentEmp();
    }, function(response) {
      console.log("Employee could not be created");
      $scope.useralert = "Employee could not be created";
    });
  };
  $scope.updatePeriod = function(emp, p) {
    var blip, date, empId, period;
    empId = emp.id;
    period = {
      id: p.id,
      workplaceId: p.workplace.id,
      blips: p.blips
    };
    date = new Date();
    blip = {
      typeOf: 2,
      timestamp: date.getTime()
    };
    period.blips.push(blip);
    console.log("workplace id: " + period.workplaceId);
    return periodService.update(empId, period).then(function(response) {
      console.log("Successful");
      $scope.selected = void 0;
      $scope.setAlertMessage(true, "Utcheckad!");
      return getEmployees(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
    }, function(response) {
      console.log("Failed");
      console.log(response);
      return $scope.setAlertMessage(false, "Utcheckningen kunde inte genomföras!");
    });
  };
  $scope.update = function(emp) {
    console.log(emp);
    return employeeService.updateProfile(emp.user.contactProfile).then(function(response) {
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
      return setEmpChange(false, "Medarbetaren kunde inte ändras.");
    });
  };
  $scope.changePassword = function(id, pwd, confirmPwd) {
    if ((pwd != null) && (confirmPwd != null) && pwd === confirmPwd) {
      return passwordServices.setPassword(id, pwd, '').then(function(response) {
        console.log("Password was set successfully");
        return setPasswordChange(true, "Lösenordet har blivit satt.");
      }, function(response) {
        console.log("Password could not be set");
        return setPasswordChange(false, "Ett fel uppstod, kunde inte sätta lösenordet.");
      });
    } else {
      return setPasswordChange(false, "Lösenorden matchar inte.");
    }
  };
  del = function(id) {
    return employeeService["delete"](id).then(function(response) {
      console.log("deleted");
      return getEmployees(true);
    }, function(response) {
      console.log("not deleted");
      return $scope.setEmpChange(false, "Medarbetaren kunde inte tas bort.");
    });
  };
  $scope.openConfirmDelete = function(emp) {
    var ModalInstanceCtrl, modalInstance;
    ModalInstanceCtrl = function($scope, $modalInstance) {
      $scope.title = "Varning!";
      $scope.text = "Vill du verkligen ta bort användaren '" + generalUtils.formatUser(emp.user) + "'";
      $scope.del = function() {
        return $modalInstance.close(1);
      };
      return $scope.cancel = function() {
        return $modalInstance.dismiss('cancel');
      };
    };
    ModalInstanceCtrl.$inject = ['$scope', '$modalInstance'];
    modalInstance = $modal.open({
      templateUrl: 'components/partials/confirm-delete-dialog.html',
      controller: ModalInstanceCtrl,
      size: 'sm'
    });
    return modalInstance.result.then(function(res) {
      return del(emp.id);
    }, function() {
      return console.log('Modal dismissed at: ' + new Date());
    });
  };
  setEmpChange = function(success, message) {
    $scope.empChange = {};
    if (success) {
      return $scope.empChange.success = message;
    } else {
      return $scope.empChange.failed = message;
    }
  };
  setPasswordChange = function(success, message) {
    $scope.passwordChange = {};
    if (success) {
      return $scope.passwordChange.success = message;
    } else {
      return $scope.passwordChange.failed = message;
    }
  };
  $scope.searchEmployees = function() {
    var DELAY_AMOUNT, DELAY_KEY;
    $scope.pageNr = 1;
    console.log("Search with searchTerm:" + $scope.searchTerm);
    DELAY_AMOUNT = 500;
    DELAY_KEY = "searchEmployeeDelay";
    return generalUtils.delayFunction(DELAY_KEY, DELAY_AMOUNT).then(function() {
      return getEmployees(true, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
    });
  };
  getEmployees = function(force, pageSize, pageNr, searchTerm) {
    return employeeService.getList(force, pageSize, pageNr, searchTerm).then(function(response) {
      console.log("got employees");
      console.log(response);
      $scope.showLoadingMessage = false;
      $scope.employees = response.data;
      $scope.totalItems = response.totalCount;
    }, function(response) {
      console.log("Could not get employees");
      return console.log(response);
    });
  };
  getWorkplaces = function(force) {
    return workplaceService.getList(force).then(function(response) {
      return $scope.workplaces = response.data;
    }, function(response) {
      return console.log("Could not get workplaces");
    });
  };
  $scope.getPeriods = function(emp) {
    var endDate, startDate;
    startDate = emp.fromDate.getTime();
    endDate = emp.untilDate.getTime();
    return periodService.getEmployeePeriods(emp.id, startDate, endDate).then(function(response) {
      var j, len, period, ref;
      $scope.periods = response;
      $scope.periodsDuration = 0;
      ref = $scope.periods;
      for (j = 0, len = ref.length; j < len; j++) {
        period = ref[j];
        period.duration = generalUtils.calcPeriodDuration(period);
        $scope.periodsDuration = $scope.periodsDuration + period.duration;
      }
      return console.log($scope.periodsDuration);
    }, function(response) {
      return console.log("failed to get periods");
    });
  };
  $scope.getLatesPeriod = function() {
    return periodService.getLatestPeriodByEmployeeId(dataService.getUserId()).then(function(response) {
      console.log("got latest period");
      console.log(response);
      console.log(response.blips[response.blips.length - 1].typeOf);
      if (response.blips[response.blips.length - 1].typeOf !== 2) {
        return $scope.activePeriod = response;
      }
    }, function(response) {
      return console.log("Could not get lates blip");
    });
  };
  $scope.startBlip = function(wp) {
    return periodService.startBlip(wp).then(function(response) {
      console.log("blip started");
      console.log(response);
      return $scope.activePeriod = response;
    }, function(response) {
      return console.log("Could not start blip");
    });
  };
  $scope.stopBlip = function(wp) {
    return periodService.stopBlip(wp, $scope.activePeriod).then(function(response) {
      console.log("blip stopped");
      console.log(response);
      return $scope.activePeriod = void 0;
    }, function(response) {
      return console.log("Could not stop blip");
    });
  };
  $scope.pauseBlip = function(wp) {
    return periodService.pauseBlip(wp, $scope.activePeriod).then(function(response) {
      console.log("blip paused");
      return console.log(response);
    }, function(response) {
      return console.log("Could not pause blip");
    });
  };
  $scope.resumeBlip = function(wp) {
    return periodService.resumeBlip(wp, $scope.activePeriod).then(function(response) {
      console.log("blip resumed");
      return console.log(response);
    }, function(response) {
      return console.log("Could not resume blip");
    });
  };
  $scope.changePage = function() {
    return getEmployees(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
  };
  
  $scope.openEmp = function(emp) {
    console.log(emp)
  	$scope.activeEmp = true;
    $scope.currentEmp = angular.copy(emp);

  }



  $scope.createUserAction = function() {


      $scope.activeEmp = true;
      $scope.editUser = true;
      $scope.currentEmp = {};
      $scope.currentEmp.id = null;



  };

  $scope.editCurrentUser = function() {

    $scope.currentEmp = angular.copy($scope.currentEmp);
    $scope.editUser = true;

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


  $scope.open = function () {
    var w = window.innerWidth;
      console.log(w)
      if(w < 1600) {
        var modalInstance = $uibModal.open({
            templateUrl: 'app/employees/addEmployeeModal.html',
            controller: ModalInstanceCtrl,
            windowClass: "modal.slide-right"

        });
      } else {
        console.log("sidebar")
        $scope.activeEmp = true;

      } 
  };



function ModalInstanceCtrl ($scope, $uibModalInstance, employeeService) {

    $scope.ok = function (user) {
        $uibModalInstance.close();
        employeeService.create(user).then(function(response) {
          console.log("Employee created succesfully");
          console.log(response);
          $scope.employees.push(response);
          //$uibModalInstance.dismiss('cancel');
          //$scope.setSelected(response.id);
          //setEmpChange(true, "Medarbetaren har skapats.");
        }, function(response) {
          console.log("Employee could not be created");
          $scope.useralert = "Employee could not be created";
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };



};

  $scope.close = function(emp) {
	$scope.activeEmp = false;
	$scope.curentEmp = emp;
  }
  
  $scope.init = function() {
    console.log("Running init in employeesController");

        companyService.get(dataService.getCurrentCompanyId()).then(function(response) {
      
      $scope.mycp = response;

      //$scope.currentEmp.union = $scope.mycp.unions[0];
      console.log(response)
    }, function(response) {
      console.log("Failed to get company");
    });



    $scope.isCollapsed = false;
    $scope.showLoadingMessage = true;
    $scope.pageSize = 10;
    $scope.pageNr = 1;
    $scope.searchTerm = "";
    $scope.newPeriods = [];
    getEmployees(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
    //getWorkplaces(true);
  	$scope.activeEmp = false;
  	$scope.activeUsr = false;
    $scope.currentEmp = {};
  };
  return $scope.init();
});

//# sourceMappingURL=employeesController.js.map
