'use strict';
angular.module('inspinia').controller("TeamCtrl", function($scope, $rootScope, teamService, generalUtils, dataService, employeeService) {
  var del, getEmployees, force, pageSize, pageNr, searchTerm;
  $scope.cancel = function() {
    $scope.teams = generalUtils.withoutUndefined($scope.teams);
    if (($scope.editId != null)) {
      $scope.selected = angular.copy(_.find($scope.teams, (function(c) {
        return c.id === $scope.editId;
      })));
      return $scope.editId = void 0;
    }
  };
  
  employeeService.getList(force, pageSize, pageNr, searchTerm).then(function(response) {
	console.log("got employees");
	console.log(response);
	$scope.employees = response.data;
  }, function(response) {
	console.log("Could not get employees");
	return console.log(response);
  });
  
  $scope.createTeamAction = function() {
	

	  $scope.activeTeam = true;
    $scope.currentTeam = {};
    $scope.currentTeam.members = [];
	  $scope.currentTeam.id = null;
	  
  };


$scope.create = function(team) {
  teamService.post(team).then(function(response) {
      $scope.activeTeam = false;
      console.log(response.data);
      $scope.teams.push(response.data.body);
      $scope.currentTeam = response.data.body;

    }, function(response) {
      console.log("Failed to get teams");
    });

}

  $scope.getTeamsList = function(force, pageSize, pageNr, searchTerm) {
    teamService.getList(force, pageSize, pageNr, searchTerm).then(function(response) {
      $scope.teams = response.data;
      console.log($scope.teams)
      return $scope.totalItems = response.totalSize;
    }, function(response) {
      return console.log("Failed to get teams");
    });
  };
  $scope.add = function() {
    var cp;
    console.log('hey');
    $scope.teams = generalUtils.withoutUndefined($scope.teams);
    cp = {};
    return $scope.teams.unshift(cp);
  };
  $scope.save = function(team) {
    if ((team.id != null)) {
      return $scope.update(team);
    } else {
      return $scope.create(team);
    }
  };
  $scope.update = function(cp) {
    return teamService.update(cp).then(function(response) {
      $scope.cancel();
      $scope.setSelected(response);
      return $scope.setAlertCp(true, "Företaget har uppdaterats");
    }, function(response) {
      console.log("Update team failed");
      return $scope.setAlertCp(false, "Företaget kunde inte uppdateras");
    });
  };
  $scope.setCurrentCompany = function(team) {
    dataService.setCurrentCompany(team);
    $rootScope.setCompanyStr(team.name);
    return $scope.currentCompanyId = team.id;
  };
  $scope.edit = function(cp) {
    $scope.cancel();
    return $scope.editId = cp.id;
  };
  $scope.setSelected = function(cp) {
    $scope.cancel();
    return $scope.selected = angular.copy(cp);
  };
  $scope.toggleSelected = function(cp) {
    if (!$scope.selected || $scope.selected.id !== cp.id) {
      return $scope.setSelected(cp);
    } else {
      return $scope.setSelected(void 0);
    }
  };
  $scope.setAlertCp = function(success, message) {
    $scope.alertCp = {};
    if (success) {
      return $scope.alertCp.success = message;
    } else {
      return $scope.alertCp.failed = message;
    }
  };
  $scope.searchCompanies = function() {
    var DELAY_AMOUNT, DELAY_KEY;
    $scope.pageNr = 1;
    DELAY_AMOUNT = 500;
    DELAY_KEY = "searchCompaniesDelay";
    return generalUtils.delayFunction(DELAY_KEY, DELAY_AMOUNT).then(function() {
      return $scope.getTeamsList(true, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
    });
  };
  $scope.openConfirmDelete = function(cp) {
    var ModalInstanceCtrl, modalInstance;
    ModalInstanceCtrl = function($scope, $modalInstance) {
      $scope.title = "Varning!";
      $scope.text = "Vill du verkligen ta bort företaget '" + generalUtils.formatUser(cp.name) + "'";
      $scope.del = function() {
        return $modalInstance.close(1);
      };
      return $scope.cancel = function() {
        return $modalInstance.dismiss('cancel');
      };
    };
    modalInstance = $modal.open({
      templateUrl: 'components/partials/confirm-delete-dialog.html',
      controller: ModalInstanceCtrl,
      size: 'sm'
    });
    return modalInstance.result.then(function(res) {
      return del(cp.id);
    }, function() {
      return console.log('Modal dismissed at: ' + new Date());
    });
  };
  del = function(id) {
    return teamService["delete"](id).then(function(response) {
      console.log("team has been deleted");
      return $scope.getTeamsList(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
    }, function(response) {
      return console.log("could not delete team");
    });
  };
  $scope.changePage = function() {
    return $scope.getTeamsList(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
  };

  $scope.openTeam = function(team) {

    teamService.get(team.id).then(function(response) {
       
      console.log(response);
      $scope.currentTeam = response;
      $scope.activeTeam = true;

    }, function(response) {
      console.log("Failed to get team members");
    });

   
    
  };
  
  $scope.createPosition = function() {
    teamService.addPosition($scope.curentCp.id, $scope.newPosition).then(function(response) {
      $scope.addingPosition = false;
      $scope.curentCp.positions.push(response);
      $scope.newPosition = {};
    }, function(response) {
      return console.log("Failed to get companany");
    });

  };

  $scope.createUnion = function() {
    teamService.addUnion($scope.curentCp.id, $scope.newUnion).then(function(response) {
      $scope.addingUnion = false;
      $scope.curentCp.unions.push(response);
      $scope.newUnion = {};
    }, function(response) {
      return console.log("Failed to get companany");
    });

  };

  $scope.createDepartment = function() {
    console.log($scope.curentCp.id)
    console.log($scope.newDept)
    teamService.addDepartment($scope.curentCp.id, $scope.newDept).then(function(response) {
      $scope.addingDept = false;
      $scope.curentCp.departmets.push(response);
      $scope.newDept = {};
    }, function(response) {
      return console.log("Failed to get companany");
    });

  };


  $scope.createShift = function() {
    teamService.addShift($scope.curentCp.id, $scope.newShift).then(function(response) {
      $scope.addingShift = false;
      $scope.curentCp.shifts.push(response);
      $scope.newShift = {};
    }, function(response) {
      return console.log("Failed to get companany");
    });

  };


  $scope.createRole = function() {
    teamService.addRole($scope.curentCp.id, $scope.newRole).then(function(response) {
      $scope.addingRole = false;
      $scope.curentCp.delegates.push(response);
      $scope.newDelegate = {};
    }, function(response) {
      return console.log("Failed to get companany");
    });

  };


$scope.addTeamMember = function(member) {
  $scope.currentTeam.members.push(member);
  $scope.addingTeam = false;
  $scope.newTeamMember = undefined;
}

  $scope.modUnion = function(union) {
    teamService.modUnion($scope.curentCp.id,union).then(function(response) {
      $scope.editOptionAction = false;
      console.log("mod union");

    }, function(response) {
      console.log("Failed to mod union");
    });
  };

  $scope.createPositionAction = function() {
    $scope.tab = 2;
    $scope.addingPosition = true;
    $scope.curentCp = {};

  };

  $scope.createUnionAction = function() {
    $scope.tab = 3;
    $scope.editUser = true;
    $scope.curentCp = {};

  };

  $scope.createUser = function(user) {
    $scope.activeEmp = false;

  };

  $scope.removePosition = function(p) {
    $scope.activeEmp = false;
    $scope.curentCp = undefined;
  }

  $scope.addPosition = function(p) {
    $scope.curentCp.positions.push(p);
    $scope.position = undefined;
  }

  $scope.showCompanies = function() {
    $scope.activeEmp = false;
    $scope.curentCp = undefined;
  }

  $scope.init = function() {
    $scope.pageSize = 10;
    $scope.pageNr = 1;
    $scope.searchTerm = "";
    $scope.getTeamsList(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
    return $scope.currentCompanyId = dataService.getCurrentCompanyId();
  };
  return $scope.init();
});

//# sourceMappingURL=teamsController.js.map
