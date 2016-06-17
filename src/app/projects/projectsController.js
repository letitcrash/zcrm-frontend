'use strict';
angular.module('inspinia').controller("ProjectsCtrl", function($scope, $rootScope, $state, projectService) {
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
//      $scope.setSelected(response.id);
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
    $scope.page = {};
    $scope.page.mode = 0;

    $scope.isCollapsed = false;
    $scope.pageSize = 10;
    $scope.pageNr = 1;
    $scope.searchTerm = "";
    $scope.currentProject= {};
    $scope.currentProject.members = [];
  };


    
  $scope.init();

});

