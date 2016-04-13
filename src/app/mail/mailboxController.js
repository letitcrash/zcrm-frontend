'use strict';
angular.module('inspinia').controller("MailboxCtrl", function($scope, $rootScope, $state, mailboxService) {
  var getMail;

  getMail = function(force, pageSize, pageNr, searchTerm) {
   mailboxService.getList(force, pageSize, pageNr, searchTerm).then(function(response) {
      console.log("got mail");
      console.log(response);
      $scope.showLoadingMessage = false;
      $scope.mail = response;
      $scope.totalItems = response.totalSize;
    }, function(response) {
      console.log("Could not get employees");
       console.log(response);
    });
  };
  $scope.showInbox = function() {
    $scope.activeMail = false;
    $scope.compose = false;

    getMail(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
  };
  $scope.composeMail = function() {
    $scope.activeMail = false;
    $scope.compose = true;
  };
  $scope.showMail = function(mail) {
    $scope.activeMail = true;
    $scope.currentMail = mail;
  
  };
  $scope.init = function() {
    console.log("Running init in mailboxController");
    $scope.activeMail = false;
    $scope.showLoadingMessage = true;
    $scope.pageSize = 10;
    $scope.pageNr = 1;
    $scope.searchTerm = "";
    $scope.newPeriods = [];
    getMail(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
    $scope.isCollapsed = true;

  };
  
  $scope.init();


});

