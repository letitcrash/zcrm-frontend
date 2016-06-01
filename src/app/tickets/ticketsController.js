'use strict';
angular.module('inspinia').controller("TicketsCtrl", function($scope, $rootScope, $location, $state,$window, ticketService) {
  var getTickets;
    var dataTable;
    
//Inserted START
   /* var dataTable = angular.module('inspinia');
    dataTable.controller('dataTableCtrl', function ($scope) {
         $scope.dataTable = [
        {status: "new", priority: "high"},
        {status: "closed", priority: "low"}
    ];
});*/
    
     $scope.dataTable = [
        {status: "new", priority: "high"},
        {status: "closed", priority: "low"}
    ];
//Inserted END

  getTickets = function(force, pageSize, pageNr, searchTerm) {
   ticketService.getList(force, pageSize, pageNr, searchTerm).then(function(response) {
      console.log("got tickets");
      console.log(response);
      $scope.showLoadingMessage = false;
      //$scope.tickets = response;
      $scope.totalItems = response.totalSize;
    }, function(response) {
      console.log("Could not get employees");
       console.log(response);
    });
  };
    

  $scope.openTicket = function (tkt) {
    $scope.activeTicket = tkt;
    $scope.showTicket = true;
    //$window.location.href = '/#/index/tickets/' + tkt.id;

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
    $scope.showTicket = false;

  };
  
  $scope.init();


});
