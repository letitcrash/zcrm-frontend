'use strict';
angular.module('inspinia').controller("TicketsCtrl", function($scope, $rootScope, $state, ticketsService) {
  var getTickets;

  getTickets = function(force, pageSize, pageNr, searchTerm) {
   ticketsService.getList(force, pageSize, pageNr, searchTerm).then(function(response) {
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

  /*$scope.showMail = function(mail) {
    $scope.activeMail = true;
    $scope.currentMail = mail;
  
  };*/
  $scope.init = function() {
    console.log("Running init in mailboxController");
    //$scope.activeMail = false;
    $scope.showLoadingMessage = true;
    $scope.pageSize = 10;
    $scope.pageNr = 1;
    $scope.searchTerm = "";
    $scope.newPeriods = [];
    getTickets(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);

  };
  
  $scope.init();


});
