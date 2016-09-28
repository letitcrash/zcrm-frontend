'use strict';
angular.module('inspinia').controller("ProjectsCtrl", function($scope, $rootScope, $state, projectService, employeesAPI, dataService, teamService, clientService) {
  var getMail, getProjects, setProjectChange;
   $scope.selected = 1;

  getProjects =  function(force, pageSize, pageNr, searchTerm) {
    projectService.getList(true, pageSize, pageNr, searchTerm).then(function(response) {
        console.log("got project list");
        console.log(response);
        $scope.projects = response.data;
      }, function(response) {
        console.log("Could not get projects");
        console.log(response);
    });
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

  $scope.getTeams = function(searchTerm) {
    return teamService.getList(searchTerm).then(function(response) {
      return response.map(function(item) {
        return item;
      });
      }, function(response) {
      console.log("Could not get employees");
      console.log(response);
      return [];
    });
  };

  $scope.getClients = function(searchTerm) {
    return clientService.getList(searchTerm).then(function(response) {
      return response.map(function(item) {
        item.fullname = item.contactProfile.firstname + " " +item.contactProfile.lastname;
        return item;
      });
      }, function(response) {
      console.log("Could not get clients");
      console.log(response);
      return [];
    });
  };

  $scope.empSelected = function(item, model, label, event) {
    console.log(item);
    $scope.currentProject.members.push(item.user);
    $scope.temp.assignedCurrentUser = undefined;

  }

  $scope.clientSelected = function(item, model, label, event) {
    console.log(item);
    $scope.currentProject.clients.push(item);
    $scope.temp.assignedCurrentClient = undefined;
    console.log($scope.currentProject);
  }

  $scope.teamSelected = function(item, model, label, event) {
    console.log(item);
    $scope.currentProject.teams.push(item);
    $scope.temp.assignedCurrentTeam = undefined;

  }
  $scope.deleteUserFromFilter = function (emp) {
    var index = $scope.currentProject.members.indexOf(emp);
    if (index > -1) {
      $scope.currentProject.members.splice(index, 1);
    }
  };

  $scope.deleteClientFromFilter = function (emp) {
    var index = $scope.currentProject.clients.indexOf(emp);
    if (index > -1) {
      $scope.currentProject.clients.splice(index, 1);
    }
  };

  $scope.deleteTeamFromFilter = function (team) {
    var index = $scope.currentProject.teams.indexOf(team);
    if (index > -1) {
      $scope.currentProject.teams.splice(index, 1);
    }
  };

  $scope.openProject = function(project) {
      $scope.page.mode = 1;
      $scope.currentProject = project;
      console.log($scope.currentProject);
  }

  $scope.defaultMode = function () {
    $scope.page.mode = 0;
  };

  $scope.compressMode = function () {
    $scope.page.mode = 1;
  };

  $scope.expandMode = function () {
    $scope.page.mode = 2;
  };


  $scope.closeCurrentProject = function() {
    $scope.page.mode = 0;

  };

  $scope.createProjectAction = function () {
    $scope.compressMode();
    $scope.currentProject = {};
    $scope.currentProject.members = [];
    $scope.currentProject.teams = [];
    $scope.currentProject.clients = [];
    $scope.currentProject.id = null;
  };

  

  $scope.save = function(project) {
    console.log(project)
    if ((project.id != null)) {
      $scope.update(project);
    } else {
      $scope.create(project);
    }
  };

  $scope.create = function(project) {
    $scope.page.error = undefined;

    projectService.create(project).then(function(response) {
      console.log("Project created succesfully");
      console.log(response);     
      $scope.projects.push(response);
      $scope.page.mode = 0;
      return setProjectChange(true, "Medarbetaren har skapats.");
    }, function(response) {
      console.log("Project could not be created");
      $scope.page.error = "Project could not be created";
    });
  };

  $scope.update = function(project) {
    console.log(project);
    projectService.update(project).then(function(response) {
      console.log("Project updated succesfully");
      setProjectChange(true, "Medarbetaren har uppdaterats.");
      console.log(response);
      $scope.currentProject = response;
      console.log(project);
      
      $scope.page.editNameAction = false;
      $scope.page.editDescriptionAction = false;
      $scope.page.editDeadLineAction = false;

    }, function(response) {
      console.log("Project could not be updated");
      setProjectChange(false, "Medarbetaren kunde inte ändras.");
    });
  };

  $scope.delete = function() {
    angular.forEach($scope.projects, function(project){
      if(project.selected){
        var index = $scope.projects.indexOf(project);
        console.log(project);
        if (index >= 0) {
          projectService.delete(project.id).then(function(response) {
            console.log("deleted");
            $scope.projects.splice(index, 1);
          }, function(response) {
            console.log("not deleted");
            setProjectChange(false, "Medarbetaren kunde inte tas bort.");
          });
        }
      }
    });
  };

  $scope.saveMembers = function (project) {
    projectService.addMembersToProject(project).then(function(response) {
      console.log("Tkt members list updated succesfully");
      console.log(response);    
      ticket.members = response;
      $scope.page.editParticipants = false;
    }, function(response) {
      console.log("Ticket members list could not be updated");
    //  $scope.page.error = "Ticket could not be created";
    });
  }
  $scope.saveClients = function (project) {
    projectService.addClientsToProject(project).then(function(response) {
      console.log("Tkt clients list updated succesfully");
      console.log(response);    
      ticket.requesters = response;
      $scope.page.editClients = false;
    }, function(response) {
      console.log("Ticket clients list could not be updated");
    //  $scope.page.error = "Ticket could not be created";
    });
  }

  $scope.saveTeams = function (project) {
    projectService.addTeamsToProject(project).then(function(response) {
      console.log("Tkt teams list updated succesfully");
      console.log(response);    
      ticket.teams = response;
      $scope.page.editTeams = false;
    }, function(response) {
      console.log("Ticket teams list could not be updated");
    //  $scope.page.error = "Ticket could not be created";
    });
  }

  $scope.deleteProject = function(project) {
    var proj = $scope.projects.filter(function( obj ) {
        return obj.id == $scope.currentProject.id;
      });
    var index = $scope.projects.indexOf(proj[0]);
    console.log(project);    
    projectService.delete(project).then(function(response) {
      console.log("deleted");
      
      if (index >= 0) {
        $scope.projects.splice(index, 1);
        console.log("doing splice");
      }
      $scope.defaultMode();
      $scope.currentProject={};
    }, function(response) {
      console.log("not deleted");
    });
  };

setProjectChange = function(success, message) {
    $scope.projChange = {};
    if (success) {
      $scope.projChange.success = message;
    } else {
      $scope.projChange.failed = message;
    }
  };

  $scope.init = function() {
    console.log("Running init in Projects Controller");
    getProjects(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
    $scope.projects=[];
    $scope.page = {};
    $scope.page.mode = 0;
    $scope.temp = {};

    $scope.isCollapsed = false;
    $scope.pageSize = 10;
    $scope.pageNr = 1;
    $scope.searchTerm = "";

    $scope.currentProject= {};
    $scope.currentProject.members = [];
    $scope.currentProject.teams = [];
    $scope.currentProject.clients = [];
    $scope.currentProject.id = null;
  };


    
  $scope.init();

});

