'use strict';
angular.module('inspinia').controller("TeamCtrl", function($scope, $rootScope, 
  teamService, generalUtils, dataService, employeesAPI) {
  var del, getEmployees, force, pageSize, pageNr, searchTerm;


  $scope.getTeamsList = function(force, pageSize, pageNr, searchTerm) {
    teamService.getList(force, pageSize, pageNr, searchTerm).then(function(response) {
      $scope.teams = response.data;
      console.log(response)
      return $scope.totalItems = response.totalSize;
    }, function(response) {
      return console.log("Failed to get teams");
    });
  };
  
  $scope.createTeamAction = function() {
	
    $scope.compressMode();

	  $scope.activeTeam = true;
    $scope.currentTeam = {};
    $scope.currentTeam.members = [];
	  $scope.currentTeam.id = null;
	  
  };

  $scope.save = function(team) {
    if ((team.id != null)) {
      return $scope.update(team);
    } else {
      return $scope.create(team);
    }
  };

  $scope.create = function(team) {
  
  teamService.create(team).then(function(response) {
      console.log("team create=> response");
      console.log(response);
      $scope.activeTeam = false;
      $scope.teams.push(response);
      $scope.currentTeam = response;
      $scope.defaultMode();



    }, function(response) {
      console.log("Failed to get teams");
    });
  }

  $scope.update = function(team) {
    return teamService.update(team).then(function(response) {
      $scope.setSelected(response);
      $scope.currentTeam = response;

      $scope.page.editNameAction = false;
      $scope.page.editDescriptionAction = false;
      $scope.page.editDescriptionAction = false;
      $scope.page.editMembers = false;

      return $scope.setAlertCp(true, "Företaget har uppdaterats");
    }, function(response) {
      console.log("Update team failed");
      return $scope.setAlertCp(false, "Företaget kunde inte uppdateras");
    });
  };

  
  $scope.openTeam = function(team) {

    teamService.get(team).then(function(response) {
       
      console.log(response);
      $scope.currentTeam = response;
      $scope.activeTeam = true;
      $scope.mode = 1;

    }, function(response) {
      console.log("Failed to get team members");
    });
  };

  

  $scope.add = function() {
    var cp;
    console.log('hey');
    $scope.teams = generalUtils.withoutUndefined($scope.teams);
    cp = {};
    return $scope.teams.unshift(cp);
  };

  

  $scope.setCurrentCompany = function(team) {
    dataService.setCurrentCompany(team);
    $rootScope.setCompanyStr(team.name);
    return $scope.currentCompanyId = team.id;
  };

  $scope.edit = function(cp) {
    return $scope.editId = cp.id;
  };

  $scope.setSelected = function(cp) {
    return $scope.selected = cp;
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

  $scope.delete = function() {
    angular.forEach($scope.teams, function(team){
      if(team.selected){
        setTimeout(function() {}, 10);
        var index = $scope.teams.indexOf(team);
        console.log(team);
        if (index >= 0) {
          teamService.delete(team).then(function(response) {
            console.log("deleted");
            $scope.teams.splice(index,1);
          }, function(response) {
          console.log("not deleted");
          });
        }
      }
    });
  };

  $scope.deleteTeam = function(team) {
    var proj = $scope.teams.filter(function( obj ) {
        return obj.id == $scope.currentTeam.id;
      });
    var index = $scope.teams.indexOf(proj[0]);
    console.log(team);    
    teamService.delete(team).then(function(response) {
      console.log("deleted");
      
      if (index >= 0) {
        $scope.teams.splice(index, 1);
        console.log("doing splice");
      }
      $scope.defaultMode();
      $scope.currentProject={};
    }, function(response) {
      console.log("not deleted");
    });
  };


  $scope.changePage = function() {
    return $scope.getTeamsList(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
  };

  




  $scope.getEmloyees = function(searchTerm) {
    return employeesAPI.all({searchTerm: searchTerm}).then(function(response) {
      return response.map(function(item) {
        item.fullname = item.user.contactProfile.firstname + " " +item.user.contactProfile.lastname;
        return item;
      });
      }, function(response) {
      console.log("Could not get employees");
      console.log(response);
      return [];
    });
  };

  $scope.addTeamMember = function(member) {
    $scope.currentTeam.members.push(member);
    $scope.page.editMembers = false;
    $scope.newTeamMember = undefined;
    console.log(member);
  }

  $scope.empSelected = function(item, model, label, event) {
    console.log(item);
    $scope.currentTeam.members.push(item);
    $scope.temp.assignedCurrentUser = undefined;
  }

  $scope.deleteUserFromFilter = function (emp) {
    var index = $scope.currentTeam.members.indexOf(emp);
    if (index > -1) {
      $scope.currentTeam.members.splice(index, 1);
    }
  };

  $scope.createUser = function(user) {
    $scope.activeEmp = false;

  };

  $scope.defaultMode = function () {
    $scope.mode = 0;
  };

  $scope.compressMode = function () {
    $scope.mode = 1;
    console.log(1);
  };

  $scope.expandMode = function () {
    $scope.mode = 2;
  };

  $scope.init = function() {
    $scope.page = {};
    $scope.pageSize = 10;
    $scope.pageNr = 1;
    $scope.searchTerm = "";
    $scope.isCollapsed = false;

    $scope.currentTeam = {};
    $scope.currentTeam.members = [];

    $scope.temp = {};


    $scope.getTeamsList(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
    return $scope.currentCompanyId = dataService.getCurrentCompanyId();
  };
  return $scope.init();
});

//# sourceMappingURL=teamsController.js.map
