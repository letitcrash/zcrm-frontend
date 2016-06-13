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

  $scope.init = function() {
    console.log("Running init in Projects Controller");
    getProjects(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
    $scope.page = {};
    $scope.page.mode = 0;
  };
    
  $scope.init();

});

