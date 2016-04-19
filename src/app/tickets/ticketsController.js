'use strict';
angular.module('inspinia').controller("TicketsCtrl", function($scope, $rootScope, $state, ticketService) {
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


  $scope.showInbox = function() {
    $scope.activeMail = false;
    getTickets(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
  };
  
  $scope.openTkt = function(tkt) {
    $scope.showTicket = true;
    $scope.activeTicket = tkt;
  };


  $scope.create = function(tkt) {
    ticketsService.create(tkt).then(function(response) {
      console.log("Tkt created succesfully");
      console.log(response);
     
      $scope.tickets.push(response);
      $scope.setSelected(response.id);
      return setEmpChange(true, "Medarbetaren har skapats.");
    }, function(response) {
      console.log("Employee could not be created");
      $scope.useralert = "Employee could not be created";
    });
  };

  $scope.init = function() {
    console.log("Running init in ticket Controller");
    //$scope.activeMail = false;
    $scope.showLoadingMessage = true;
    $scope.pageSize = 10;
    $scope.pageNr = 1;
    $scope.searchTerm = "";
    $scope.newPeriods = [];
    getTickets(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
    $scope.isCollapsed = true;
  };
  
  $scope.init();


});
