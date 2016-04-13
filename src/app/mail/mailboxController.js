'use strict';
angular.module('inspinia').controller("MailboxCtrl", function($scope, $rootScope, $state, mailboxService) {
  var getMail,getOutbox;

  getMail = function(force, pageSize, pageNr, searchTerm) {
   mailboxService.getInbox(force, pageSize, pageNr, searchTerm).then(function(response) {
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
  
  getOutbox = function(force, pageSize, pageNr, searchTerm) {
   mailboxService.getOutbox(force, pageSize, pageNr, searchTerm).then(function(response) {
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

  $scope.showOutbox = function() {
    $scope.activeMail = false;
    $scope.compose = false;

    getOutbox(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
  };

  $scope.composeMail = function() {
    $scope.activeMail = false;
    $scope.compose = true;
  };

  $scope.sendMail = function(email, recp) {
    email.to = [];
    email.to.push(recp);
    console.log(email);

    mailboxService.post(email).then(function(response) {
      console.log("sent mail");
      console.log(response);
     
    }, function(response) {
      console.log("Could not sent mail");
       console.log(response);
    });

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

