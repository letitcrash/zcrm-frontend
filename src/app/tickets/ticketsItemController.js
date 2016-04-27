'use strict';
angular.module('inspinia').controller("ItemTicketsCtrl", function($scope, $rootScope, $location, $state, ticketService) {
  var getTickets;

  getTickets = function(force, pageSize, pageNr, searchTerm) {
   ticketService.getList(force, pageSize, pageNr, searchTerm).then(function(response) {
      console.log("got tickets");
      console.log(response);
      $scope.showLoadingMessage = false;
      $scope.tickets = response;
      $scope.totalItems = response.totalSize;
    }, function(response) {
      console.log("Could not get employees");
       console.log(response);
    });
  };
  
  $scope.init = function() {
    console.log("Running init in ticket ItemController");
    //$scope.activeMail = false;
    $scope.showLoadingMessage = true;
    $scope.pageSize = 10;
    $scope.pageNr = 1;
    $scope.searchTerm = "";
    $scope.newPeriods = [];
    //getTickets(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
    $scope.isCollapsed = true;
    $scope.showTicket = true;
    $scope.activeTicket = $scope.tickets;


  };
  
  $scope.init();


});