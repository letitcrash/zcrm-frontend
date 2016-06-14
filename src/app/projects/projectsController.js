'use strict';
angular.module('inspinia').controller("ProjectsCtrl", function($scope, $rootScope, $state, projectService) {
  var getMail, getProjects;

  getProjects =  function(force, pageSize, pageNr, searchTerm) {
    projectService.getList(true, pageSize, pageNr, searchTerm).then(function(response) {
        console.log("got project list");
        console.log(response);
        $scope.projects = response;
      }, function(response) {
        console.log("Could not get projects");
        console.log(response);
    });
  };

  

  $scope.openProject = function(proj) {
      console.log(proj)
      if($scope.page.mode == 0) {
        $scope.page.mode = 1;
        console.log($scope.page.mode);
      }
      $scope.currentProject = angular.copy(proj);
  }

  $scope.defaultMode = function () {
    $scope.page.mode = 0;
    console.log($scope.page.mode);
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

